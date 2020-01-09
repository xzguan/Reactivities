import React from 'react'
import { Dimmer, Loader } from "semantic-ui-react";
export const LoadingComponent : React.FC<{inverted:boolean,content:string}> = ({inverted,content}) => {
    return (
        <Dimmer inverted={inverted} active>
            <Loader>{content}</Loader>
        </Dimmer>
    )
}

