import styled from "@emotion/styled";
import { darken } from "metabase/lib/colors";

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  &:hover {
    background-color: ${darken("brand", 0.12)};
  }
`;

export const CloseIconContainer = styled.span`
  margin-left: auto;
  padding: 1rem;
  border-left: 1px solid ${darken("brand", 0.2)};

  &:hover {
    background-color: ${darken("brand", 0.12)};
  }
`;

export const RemoveIconContainer = styled.span`
  margin-left: auto;
  padding: 1.0625rem;
  border-left: 1px solid ${darken("brand", 0.2)};

  &:hover {
    background-color: ${darken("brand", 0.12)};
  }
`;