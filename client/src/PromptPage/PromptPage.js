import React from 'react';
import Axios from 'axios';
import './PromptPage.scss'

const rce = React.createElement;

//props
//  state: ['', '', '', '', '']
function PromptPage(props) {
    const prompts = props.state.slice();

    function handlePromptChange(event) {
        const newPrompt = event.target.value;
        const index = parseInt(event.target.getAttribute('idx'));
        prompts[index] = newPrompt;
        props.setState(prompts);
    }

    const promptItems = prompts.map((val, index) => {
        return rce('li', {className: 'prompt', key: index}, 
            rce('input', {type: 'text', idx: index, value: val, onChange: handlePromptChange})
        )
    });

    function submit() {
        Axios.post('http://localhost:9000/game/post-prompts', {
            prompts: prompts
        }).then(res =>{
            console.log(`statusCode: ${res.statusCode}`);
            console.log(res);
        }).catch(error => {
            console.log(error);
            console.log(error.stack);
        });
    }

    return rce('div', {className: 'prompt-page'},
        rce('ul', {className: 'prompts-list'}, promptItems),
        rce('button', {className: 'submit-button', onClick: submit}, 'submit')
    );
}

export default PromptPage;