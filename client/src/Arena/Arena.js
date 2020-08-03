import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {endRoundUrl, nextUrl, endTurnUrl} from '../config';

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
        if (arenaState.inArena) { // if just entered the arena
            alert('start timer!');
        }
    }, [arenaState.inArena]); //only fire this if the inArena status has changed

    function getNext() {
        arenaState.prompts.shift();
        if (arenaState.prompts.length === 0) {
            Axios.get(endRoundUrl)
                .then(res => {
                    arenaState.prompts = arenaState.prompts.concat(res.data.prompts);
                    props.setState(arenaState);
                }).catch(err => {
                    console.log(err);
                });
            alert('That\'s all the prompts! Pause time and prepare for the next round');
        } else {
            props.setState(arenaState);
            Axios.get(nextUrl)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    function skip() { //should put last element at front and first element at back
        // console.log('===== entering skip =====')
        // console.log('prompts: ' + arenaState.prompts);
        // console.log('skippedPrompt: ' + arenaState.skippedPrompt);
        const last = arenaState.prompts.pop();
        const first = arenaState.prompts.splice(0, 1, last)[0];
        arenaState.prompts.push(first);
        props.setState(arenaState);
    }

    function finish() {
        const unfinishedPrompts = arenaState.prompts;

        arenaState.inArena = false;
        props.setState(arenaState);
        Axios.post(endTurnUrl, {
            unfinishedPrompts: unfinishedPrompts
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    function canSkip() {
        return arenaState.prompts.length > 1;
    }

    return arenaState.inArena ? 
        rce('div', {className: 'Arena'},
            rce('h1', {className: 'active-prompt'}, arenaState.prompts[0]),
            rce('button', {className: 'next-button', onClick: getNext}, 'next'),
            rce('button', {className: canSkip() ? 'skip-button' : 'hidden', onClick: skip}, 'skip'),
            rce('button', {className: 'finish-button', onClick: finish}, 'finish')
        )
        :
        rce('div');
}

export default Arena;
