import styled from "@emotion/styled";
import { color } from "metabase/lib/colors";
import {
  space,
  breakpointMaxSmall,
  breakpointMinHeightMedium,
} from "metabase/styled-components/theme";

import TabList from "metabase/core/components/TabList";
import TabPanel from "metabase/core/components/TabPanel";
import Ellipsified from "metabase/core/components/Ellipsified";
import IconButtonWrapper from "metabase/components/IconButtonWrapper";

export const ModalRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: min(98vw, 50rem);
  ${breakpointMaxSmall} {
    height: 98vh;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 3rem 0 3rem;
  ${breakpointMinHeightMedium} {
    padding: 2rem 3rem 0 3rem;
  }
`;

export const ModalBody = styled.div`
  border-top: 1px solid ${color("border")};
  margin-top: 1rem;
  ${breakpointMinHeightMedium} {
    margin-top: 1.5rem;
  }
  overflow-y: auto;
  flex: 1;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 3rem;
`;

export const ModalTitle = styled(Ellipsified)`
  flex: 1 1 auto;
  color: ${color("text-dark")};
  font-size: 1rem;
  ${breakpointMinHeightMedium} {
    font-size: 1.25rem;
  }
  line-height: 1.5rem;
  font-weight: bold;
`;

export const ModalTabList = styled(TabList)`
  font-size: 0.875rem;
  ${breakpointMinHeightMedium} {
    font-size: 1rem;
  }
  margin: 1.5rem 3rem 0 3rem;
  flex-shrink: 0;
`;

export const ModalTabPanel = styled(TabPanel)`
  overflow-y: auto;
  flex: 1;
`;

interface ModalDividerProps {
  marginY?: string;
}

export const ModalDivider = styled.div<ModalDividerProps>`
  border-top: 1px solid ${color("border")};
  margin: ${props => (props.marginY ? props.marginY : "0")} 0;
`;

export const ModalCloseButton = styled(IconButtonWrapper)`
  flex: 0 0 auto;
  color: ${color("text-light")};
`;

export const SearchContainer = styled.div`
  margin-right: ${space(2)};

  input {
    font-weight: bold;
    padding: 12px ${space(3)};
  }
`;
