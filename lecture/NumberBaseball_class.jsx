import React, { Component } from 'react';

import Try from './Try';

// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for(let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];

        array.push(chosen);
    }

    return array;
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),   // ex: [1, 3, 5, 7]
        tries: [],  // push
    };

    onSubmitForm = (e) => {
        e.preventDefault();

        const { value, tries, answer} = this.state;

        if(value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, {try: value, result: '홈런!'}],
                };
            });

            alert('게임을 다시 시작합니다!');

            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        }
        // 답 틀렸으면
        else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            if(tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`,
                });

                alert('게임을 다시 시작합니다!');

                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            }
            else {
                for(let i = 0; i < 4; i++) {
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    }
                    else if(answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }

                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                        value: '',
                    };
                });
            }
        }

        console.log(value);
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);

        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { result, value, tries } = this.state;

        return (
            <>
            <h1>{result}</h1>
            <form onSubmit={this.onSubmitForm}>
                <input maxLength={4} value={value} onChange={this.onChangeInput} />
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try key={`${i + 1}차 시도:`} tryInfo={v} />
                    );
                })}
            </ul>
            </>
        );
    }
}

export default NumberBaseball;

/*
import React, { Component } from 'react';

class NumberBaseball extends Component {

}

export const hello = 'hello';   // import { hello }
export const bye = 'bye';   // import { hello, bye }

export default NumberBaseball;  // import NumberBaseball;

// const React = require('react');
// exports.hello = 'hello';
// module.exports = NumberBaseball;

*/