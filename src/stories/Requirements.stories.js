import React from "react";
import { storiesOf } from "@storybook/react";
import { Requirements } from "../components/Requirements/Requirements";
import StyroMarquee from "../components/StryroMarquee";

const stories = storiesOf('App Test', module);

stories.add('Add', ()=>{
    return (
      <>
        <Requirements />
        <StyroMarquee
          gradientWidth="100"
          direction="right"
          speed={20}
          delay={2}
        >
          Hello World
        </StyroMarquee>
      </>
    );
})