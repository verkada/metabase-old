import styled from "@emotion/styled";
import { color } from "metabase/lib/colors";

import SyncedParametersList from "metabase/parameters/components/SyncedParametersList/SyncedParametersList";
import { breakpointMaxSmall } from "metabase/styled-components/theme";

export const NativeQueryEditorRoot = styled.div`
  .ace_editor {
    height: 100%;
    background-color: ${color("bg-light")};
    color: ${color("text-dark")};
  }

  .ace_editor .ace_keyword {
    color: ${color("saturated-purple")};
  }

  .ace_editor .ace_function,
  .ace_editor .ace_variable {
    color: ${color("saturated-blue")};
  }

  .ace_editor .ace_constant,
  .ace_editor .ace_type {
    color: ${color("saturated-red")};
  }

  .ace_editor .ace_string {
    color: ${color("saturated-green")};
  }

  .ace_editor .ace_templateTag {
    color: ${color("brand")};
  }

  .react-resizable {
    position: relative;
  }

  .react-resizable-handle {
    position: absolute;
    width: 100%;
    height: 10px;
    bottom: -5px;
    cursor: ns-resize;
  }

  .ace_editor.read-only .ace_cursor {
    display: none;
  }

  .ace_editor .ace_gutter-cell {
    padding-top: 2px;
    font-size: 10px;
    font-weight: 700;
    color: ${color("text-light")};
    padding-left: 0;
    padding-right: 7px;
    display: block;
    text-align: center;
  }

  .ace_editor .ace_gutter {
    background-color: ${color("bg-light")};
  }
`;

export const StyledSyncedParametersList = styled(SyncedParametersList)`
  margin: 0.5rem 1rem 0 1rem;

  ${breakpointMaxSmall} {
    width: 100vw;
    overflow-x: auto;
    margin: 0.25rem 0 0;
    padding: 0.25rem 0;
    flex-wrap: nowrap;

    fieldset {
      margin-left: 1rem;
      margin-top: 0.25rem;
    }
  }
`;
