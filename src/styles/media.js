import { css } from "styled-components";

const sizes = {
  mobile: "640px",
  tablet: "768px",
  desktop: "1024px",
};

export const media = {
  mobile: (...args) => css`
    @media (max-width: ${sizes.mobile}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: ${sizes.tablet}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (max-width: ${sizes.desktop}) {
      ${css(...args)}
    }
  `,
};
