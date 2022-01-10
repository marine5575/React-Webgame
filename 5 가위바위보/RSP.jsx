import React, { useState, useRef, useEffect } from 'react';

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


//                        result, imgCoord, score
// componentDidMount
// componentDidUpdate
// componentWillUnmount

// componentDidMount() {
//     this.setState({
//         imgCoord: 1,
//         score: 2,
//         result: 3,
//     });
// }
// useEffect(() => {
//     setImgCoord();
//     setScore();
// }, [imgCoord, score]);
// useEffect(() => {
//     setResult();
// }, [result]);


const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.rock);
    const [score, setScore] = useState(0);
    const interval = useRef(null);

    useEffect(() => {   // componentDidMount, componentDidUpdate 역할(일대일 대응은 아님)
        // console.log('다시 실행');
        interval.current = setInterval(changeHand, 100);

        return (() => { // componentWillUnmount 역할
            // console.log('종료');
            clearInterval(interval.current);
        });
    }, [imgCoord]);

    const changeHand = () => {
        if(imgCoord === rspCoords.rock) {
            setImgCoord(rspCoords.scissors);

        } else if(imgCoord === rspCoords.scissors) {
            setImgCoord(rspCoords.paper);

        } else if(imgCoord === rspCoords.paper) {
            setImgCoord(rspCoords.rock);
        }
    };

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);

        const myScore = scores[choice];
        const comScore = scores[computerChoice(imgCoord)];
        const diff = myScore - comScore;

        if(diff === 0) {
            setResult('비겼습니다.');

        } else if([1, -2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);

        } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
        }
        
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000);
    };


    return (
        <>
        <div id='computer' style={{ background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
        <div>
            <button id='rock' className='btn' onClick={onClickBtn('rock')}>바위</button>
            <button id='scissors' className='btn' onClick={onClickBtn('scissors')}>가위</button>
            <button id='paper' className='btn' onClick={onClickBtn('paper')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
        </>
    );
}

export default RSP;