import React, { Component } from 'react';

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// -> (setState/props 바뀔 때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
    rock: '0',
    scissors: '-142px',
    paper: '-284px',
};
const scores = {
    rock: 1,
    scissors: 0,
    paper: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imgCoord;
    })[0];
};


class RSP extends Component {
    state = {
        result: '',
        imgCoord: rspCoords.rock,
        score: 0,
    };

    interval;

    componentDidMount() {   // component가 첫 렌더링된 후, 여기에 비동기 요청을 많이 해요
        this.interval = setInterval(this.changeHand, 100);
    }

    // componentDidUpdate() {  // 다시 렌더링된 후
    // }

    componentWillUnmount() {    // component가 제거되기 직전, 남아있는 비동기 요청 정리를 많이 해요
        clearInterval(this.interval);
    }

    changeHand = () => {
        const { imgCoord } = this.state;

        if(imgCoord === rspCoords.rock) {
            this.setState({
                imgCoord: rspCoords.scissors,
            });

        } else if(imgCoord === rspCoords.scissors) {
            this.setState({
                imgCoord: rspCoords.paper,
            });

        } else if(imgCoord === rspCoords.paper) {
            this.setState({
                imgCoord: rspCoords.rock,
            });
        }
    };

    onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;

        clearInterval(this.interval);

        const myScore = scores[choice];
        const comScore = scores[computerChoice(imgCoord)];
        const diff = myScore - comScore;

        if(diff === 0) {
            this.setState({
                result: '비겼습니다.',
            });

        } else if([1, -2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                };
            });

        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1,
                };
            });
        }
        
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000);
    };

    render() {
        const { result, score, imgCoord } = this.state;

        return (
            <>
            <div id='computer' style={{ background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id='rock' className='btn' onClick={this.onClickBtn('rock')}>바위</button>
                <button id='scissors' className='btn' onClick={this.onClickBtn('scissors')}>가위</button>
                <button id='paper' className='btn' onClick={this.onClickBtn('paper')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;