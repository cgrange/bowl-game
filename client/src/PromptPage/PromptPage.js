import React, { useState } from 'react';
import Axios from 'axios';
import './PromptPage.scss'
import { postPromptsUrl } from '../config';

const rce = React.createElement;

function PromptPage() {
    const [prompts, setPrompts] = useState(['', '', '', '', '']);
    const [submitted, setSubmitted] = useState(false);

    function handlePromptChange(event) {
        const newPrompt = event.target.value;
        const index = parseInt(event.target.getAttribute('idx'));
        prompts[index] = newPrompt;
        setPrompts(prompts.splice(0));
    }

    const promptItems = prompts.map((val, index) => {
        return rce('li', {className: 'prompt', key: index}, 
            rce('input', {type: 'text', idx: index, value: val, onChange: handlePromptChange})
        )
    });

    function submit() {
        Axios.post(postPromptsUrl, {
            prompts: prompts
        }).then(res =>{
            setSubmitted(true);
        }).catch(error => {
            console.log(error);
            console.log(error.stack);
        });
    }

    function skip() {
        setSubmitted(true);
    }

    return rce('div', {className: submitted ? 'PromptPage hidden' : 'PromptPage'},
        rce('ul', {className: 'prompts-list'}, promptItems),
        rce('button', {className: 'submit-button', onClick: submit}, 'submit'),
        rce('button', {className: 'skip-button', onClick: skip}, 'skip'),
    );
}

export default PromptPage;