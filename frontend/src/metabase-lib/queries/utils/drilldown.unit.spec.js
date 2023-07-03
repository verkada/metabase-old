import { createMockMetadata } from "__support__/metadata";
import {
  createSampleDatabase,
  ORDERS,
  PEOPLE,
} from "metabase-types/api/mocks/presets";
import { drillDownForDimensions } from "metabase-lib/queries/utils/drilldown";

describe("drilldown", () => {
  const metadata = createMockMetadata({
    databases: [createSampleDatabase()],
  });

  const latitude = metadata.field(PEOPLE.LATITUDE);
  const longitude = metadata.field(PEOPLE.LONGITUDE);
  const state = metadata.field(PEOPLE.STATE);
  const total = metadata.field(ORDERS.TOTAL);
  const createdAt = metadata.field(ORDERS.CREATED_AT);

  describe("drillDownForDimensions", () => {
    it("should return null if there are no dimensions", () => {
      const drillDown = drillDownForDimensions([], metadata);
      expect(drillDown).toEqual(null);
    });

    // DATE/TIME:
    it("should return breakout by quarter for breakout by year", () => {
      const drillDown = drillDownForDimensions(
        [
          {
            column: createdAt.column({ unit: "year" }),
          },
        ],
        metadata,
      );
      expect(drillDown).toEqual({
        breakouts: [
          ["field", ORDERS.CREATED_AT, { "temporal-unit": "quarter" }],
        ],
      });
    });

    it("should return breakout by minute for breakout by hour", () => {
      const drillDown = drillDownForDimensions(
        [
          {
            column: createdAt.column({ unit: "hour" }),
          },
        ],
        metadata,
      );
      expect(drillDown).toEqual({
        breakouts: [
          ["field", ORDERS.CREATED_AT, { "temporal-unit": "minute" }],
        ],
      });
    });

    it("should return null for breakout by minute", () => {
      const drillDown = drillDownForDimensions(
        [
          {
            column: createdAt.column({
              unit: "minute",
            }),
          },
        ],
        metadata,
      );
      expect(drillDown).toEqual(null);
    });

    // NUMERIC:
    it("should reset breakout to default binning for num-bins strategy", () => {
      const drillDown = drillDownForDimensions(
        [
          {
            column: total.column({
              binning_info: {
                binning_strategy: "num-bins",
                num_bins: 10,
              },
            }),
          },
        ],
        metadata,
      );
      expect(drillDown).toEqual({
        breakouts: [
          ["field", ORDERS.TOTAL, { binning: { strategy: "default" } }],
        ],
      });
    });

    it("should return breakout with bin-width of 1 for bin-width of 10", () => {
      const drillDown = drillDownForDimensions(
        [
          {
            column: total.column({
              binning_info: {
                binning_strategy: "bin-width",
                bin_width: 10,
              },
            }),
          },
        ],
        metadata,
      );
      expect(drillDown).toEqual({
        breakouts: [
          [
            "field",
            ORDERS.TOTAL,
            { binning: { strategy: "bin-width", "bin-width": 1 } },
          ],
        ],
      });
    });

    // GEO:
    it("should return breakout by lat/lon for breakout by state", () => {
      const drillDown = drillDownForDimensions(
        [{ column: state.column() }],
        metadata,
      );
      expect(drillDown).toEqual({
        breakouts: [
          [
            "field",
            PEOPLE.LATITUDE,
            { binning: { strategy: "bin-width", "bin-width": 1 } },
          ],
          [
            "field",
            PEOPLE.LONGITUDE,
            { binning: { strategy: "bin-width", "bin-width": 1 } },
          ],
        ],
      });
    });

    it("should return breakout with 10 degree bin-width for lat/lon breakout with 30 degree bin-width", () => {
      const drillDown = drillDownForDimensions(
        [
          {
            column: latitude.column({
              binning_info: {
                binning_strategy: "bin-width",
                bin_width: 30,
              },
            }),
          },
          {
            column: longitude.column({
              binning_info: {
                binning_strategy: "bin-width",
                bin_width: 30,
              },
            }),
          },
        ],
        metadata,
      );
      expect(drillDown).toEqual({
        breakouts: [
          [
            "field",
            PEOPLE.LATITUDE,
            { binning: { strategy: "bin-width", "bin-width": 10 } },
          ],
          [
            "field",
            PEOPLE.LONGITUDE,
            { binning: { strategy: "bin-width", "bin-width": 10 } },
          ],
        ],
      });
    });
  });
});
