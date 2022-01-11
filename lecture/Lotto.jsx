import React, { Component, useState, useRef, useEffect, useMemo, useCallback } from "react";

import Ball from './Ball';

const getWinNumbers = () => {
    console.log('getWinNumbers');

    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];

    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

    return [...winNumbers, bonusNumber];
};

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    // useEffect(() => {
    //     // ajax
    // }, []);
    // const mounted = useRef(false);
    // useEffect(() => {
    //     if(!mounted.current) {
    //         mounted.current = true;
    //     } else {
    //         // ajax
    //     }
    // }, [바뀌는값]); // componentDidUpdate만, componentDidMount는 x

    useEffect(() => {
        console.log('useEffect');

        for(let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }

        timeouts.current[winNumbers.length - 1] = setTimeout(() => {
            setBonus(winNumbers[winNumbers.length - 1]);
            setRedo(true);
        }, (winNumbers.length) * 1000);

        return (() => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        });
    }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행

    useEffect(() => {
        console.log('로또 숫자를 생성합니다.');
    }, [winNumbers]);

    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers);

        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);

        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
        <div>당첨 숫자</div>
        <div id='resultDisplay'>
            {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
};

export default Lotto;
