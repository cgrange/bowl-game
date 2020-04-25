import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {severUrl, nextUrl} from '../config';

const rce = React.createElement;

//props.state:
//  {
//      timeLimit: int,
//      prompts: [str, str, str],
//      inArena: bool
//  }
function Arena(props) {
    const arenaState = JSON.parse(JSON.stringify(props.state));

    useEffect(() => {
        console.log('rendered');
    })

    useEffect(() => {
        if (arenaState.inArena) { // if just entered the arena
            // todo start game timeLimit
        }
    }, [arenaState.inArena]); //only fire this if the inArena status has changed

    function getNext() {
        arenaState.prompts.shift();
        props.setState(arenaState);
        Axios.get(nextUrl)
            .then(res => {
                arenaState.prompts.push(res.data.nextPrompt);
                props.setState(arenaState);
            }).catch(err => {
                console.log(err);
            });
    }

    function skip() {
        // console.log('===== entering skip =====')
        // console.log('prompts: ' + arenaState.prompts);
        // console.log('skippedPrompt: ' + arenaState.skippedPrompt);
        if (arenaState.skippedPrompt) {
            const newSkippedPrompt = arenaState.prompts[0];
            arenaState.prompts.splice(0, 1, arenaState.skippedPrompt); // replace first element in prompts with skippedPrompt
            arenaState.skippedPrompt = newSkippedPrompt;
            props.setState(arenaState);
        } else {
            arenaState.skippedPrompt = arenaState.prompts.shift();
            props.setState(arenaState);
        }
    }

    return arenaState.inArena ? 
        rce('div', {className: 'Arena'},
            rce('h1', {className: 'active-prompt'}, arenaState.prompts[0]),
            rce('button', {className: 'next-button', onClick: getNext}, 'next'),
            rce('button', {className: 'skip-button', onClick: skip}, 'skip')
        )
        :
        rce('div');
}

export default Arena;
