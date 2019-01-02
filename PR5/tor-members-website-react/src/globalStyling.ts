import { createGlobalStyle } from 'styled-components';
import theme from './constants/theme';

const GlobalStyle = createGlobalStyle`
 html {
        font-size: 10px;
        height: 100%;
    }
    
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        font: ${theme.fonts.body};
        
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }

    h1 {
        font-weight: 500;

    }

    h2 {
        font-weight: 500;
    }

    h3 {

        font-weight: 500;

    }
    h4 {
        display: flex;
        flex-direction: column
        margin: 0;
        font-weight: 500;

    }
    

    button {
        cursor: pointer;
    }
    
    @font-face{
        font-family:"Uniform";
        font-weight: 300;
        src:url("/fonts/051903bc-b4fe-46c8-98e2-95962afcd52e.eot?#iefix");
        src:url("/fonts/051903bc-b4fe-46c8-98e2-95962afcd52e.eot?#iefix") format("eot"),url("/fonts/03a08762-460e-4500-ae81-0f86719cf0e5.woff2") format("woff2"),url("/fonts/8b984417-b738-4d2f-b7fd-88a16e7dd121.woff") format("woff"),url("/fonts/53311409-e161-4c9c-be17-9fb00984b6d9.ttf") format("truetype"),url("/fonts/119b2392-980e-4694-96a7-0a5ee4c094b1.svg#119b2392-980e-4694-96a7-0a5ee4c094b1") format("svg");
    }
    @font-face{
        font-family:"Uniform";
        font-weight: 400;
        src:url("/fonts/872c49de-7e10-4dfc-875f-b7465f47fe83.eot?#iefix");
        src:url("/fonts/872c49de-7e10-4dfc-875f-b7465f47fe83.eot?#iefix") format("eot"),url("/fonts/e37866fa-e728-4623-96a9-44bf729bf17c.woff2") format("woff2"),url("/fonts/8c6c0966-73ba-4afc-86d7-cdb84fda6c97.woff") format("woff"),url("/fonts/683fe307-348b-44a6-98a8-be9da795e93c.ttf") format("truetype"),url("/fonts/4584092a-3d0f-43f7-b3f6-8c39deabb584.svg#4584092a-3d0f-43f7-b3f6-8c39deabb584") format("svg");
    }
    @font-face{
        font-family:"Uniform";
        font-weight: 500;;
        src:url("/fonts/68b1cf55-8704-4498-ad8e-f0818e15c685.eot?#iefix");
        src:url("/fonts/68b1cf55-8704-4498-ad8e-f0818e15c685.eot?#iefix") format("eot"),url("/fonts/44435405-fa6c-40a4-929a-219d92a6eaa9.woff2") format("woff2"),url("/fonts/bcf10c7f-10a1-4907-ac78-f33a65e2f955.woff") format("woff"),url("/fonts/dc3edeb6-60be-4ce6-a3ac-36480780b440.ttf") format("truetype"),url("/fonts/0867e287-a3c8-40f9-b726-e141865215a2.svg#0867e287-a3c8-40f9-b726-e141865215a2") format("svg");
    }
    @font-face{
        font-family:"Uniform";
        font-weight: 700;
        src:url("/fonts/983de45f-0033-4ef8-bccf-1f7860951215.eot?#iefix");
        src:url("/fonts/983de45f-0033-4ef8-bccf-1f7860951215.eot?#iefix") format("eot"),url("/fonts/3d9563f7-e06c-4a5f-8780-433c0a223d03.woff2") format("woff2"),url("/fonts/22a200e7-90c6-4fdf-83ff-4d7297591d88.woff") format("woff"),url("/fonts/1073acee-08e6-4332-beaa-f090924eed1f.ttf") format("truetype"),url("/fonts/92f1aa8a-d67c-4d78-a885-607b1693230b.svg#92f1aa8a-d67c-4d78-a885-607b1693230b") format("svg");
    }
`;

export default GlobalStyle;
