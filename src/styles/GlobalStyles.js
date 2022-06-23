import { createGlobalStyle } from "styled-components"

const GlobalStyled = createGlobalStyle`
@font-face{
  font-family: 'Arial Rounded Bold';
  src: url('../../static/fonts/arialroundedmtbold.ttf') format("ttf");
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}
  :root {
    --darkpurple: #612C8F;
    --lightpurple: #b095c7;
    --black: #000000;
    --grey: #F0F0F0;
    --white: #FFFFFF;
    --placeholder: #808080;
    --container-xl: 1400px;
    --fontPrimary: 'Arial Rounded Bold', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    --fontPrimaryBold: 'Integral CF Bold', 'ARIAL BLACK', Heavy -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  html {
    word-break: break-word;
    font-size: 10px;
    background-color: var(--white);
    scroll-behavior: smooth;
    &::selection {
      background: var(--darkpurple);
      color: white;
    }
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    scrollbar-width: thin;
    scrollbar-color: #612C8F #EEEEEF;
    background-color: #ECECEC;
    overflow-x: hidden;
    &::selection {
      background: var(--darkpurple);
      color: white;
    }
  }

  h1,h2,h3,h4,h5,h6,
  ul,ol,li,a,p,span,div,input{
    margin: 0;
    padding: 0;
    font-family: "Arial Rounded Bold", sans-serif;
  }

  ::selection {
      background: var(--darkpurple);
      color: white;
    }

  * {
    box-sizing: border-box;
  }

  .p-0 {
    padding: 0px 0px;
  }

  fieldset {
    border-color: rgba(0, 0, 0, 0.1);
    border-width: 1px;
  }

  .container {
    width: 100%;
    margin: 0 auto;
    max-width: 1400px;
    padding: 0 10px;

  }


  #gatsby-focus-wrapper {
    min-height: 100vh;
    flex-direction: column;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
  }

  .hide {
    display: none;
  }

  .hide-text {
    font-size: 0;
  }

  main {
    flex-grow: 2;
    max-width: 192rem;
    margin: auto;
  }

  footer {
    content-visibility: auto;
  }

  // primary button
  .main_button {
    border: 1px solid black;
    padding: 17px 0;
    box-sizing: border-box;
    font-family: 'Integral CF Bold';
    background: white;
    color: black;
    width: 100%;
    max-width: 330px;
    font-style: normal;
    text-transform: uppercase;
    margin: 0 auto;
    display: block;
    text-align: center;
    transition: 0.2s;
    font-size: 18px;
    max-width: calc(100% - 10px);
    cursor: pointer;

    &--purple {
      background: var(--lightpurple);
      color: #fff;
      border: none;
    }

    &:disabled {
      opacity: .5;

      &:hover {
        cursor: no-drop;
      }
    }

    &:not(:disabled) {
      &:hover {
        font-style: italic;
        background: #612c8f;
        color: white;
      }
    }
  }


  // default input
  .input {
    padding: 34px;
    background: #fff;
    border: 1px solid #000;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.01em;
    font-family: 'Integral CF Bold';
    display: block;
    width: 100%;

    &::-webkit-input-placeholder {
      color: var(--placeholder);
    }

    &::-moz-placeholder {
      color: var(--placeholder);
    }

    &:-moz-placeholder {
      color: var(--placeholder);
    }

    &:-ms-input-placeholder {
      color: var(--placeholder);
    }
  }

  // default checkbox
  .checkbox {
    margin: 32px 0;

    label {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 12px;
      text-transform: uppercase;
      font-family: 'Integral CF Bold';
      cursor: pointer;

      &::before {
        content: '';
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 42px;
        min-height: 42px;
        border: 1px solid;
        margin-right: 24px;
        font-size: 24px;

      }
    }

    input {
      opacity: 0;
      position: absolute;

      &:checked {

        + label {
          &::before {
            content: '✓'
          }
        }
      }
    }
  }

  .loading {
    display: none;
  }

  // default range
  .range {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 1px solid #000000;
      height: 36px;
      width: 36px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      margin-top: -14px; /* Chrome */
      border: 1px solid #000;
    }

    &::-moz-range-thumb {
      border: 1px solid #000000;
      height: 36px;
      width: 36px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      border: 1px solid #000;
    }

    &:focus {
      outline: none;
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 6px;
      cursor: pointer;
      background: #fff;
    }

    &::-moz-range-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: #3071a9;
      border-radius: 1.3px;
      border: 0.2px solid #010101;
    }
  }
  
  .label-form-footer{
    font-family: var(--fontPrimary);
    margin-right: 10px;
  }
  .group-footer-form{
    margin: 10px 0px;
    input{
      color: black;
    }
  }
  .button-form-footer{
    background-color: white;
    color: black;
    border-radius: 0px;
    box-shadow: 0px;
    border: 0px;
    width: 100%;
    padding: 10px 15px;
    font-family: var(--fontPrimary);
  }
  button{
    cursor: pointer;
  }
  
  .active-arrow{
    transform: rotate(90deg);
  }
  
  a{
    text-decoration: none;
  }
  
  li{
    list-style-type: none;
  }
`

export default GlobalStyled;
