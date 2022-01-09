import React, { PureComponent } from 'react';

class Try extends PureComponent {
    // constructor(props) {
    //     super(props);
    //     // 다른 동작
    //     const filterd = this.props.filter(() => {
    //     });
    //     this.state = {
    //         result: filterd,
    //         try: this.props.try,
    //     };
    // }

    render() {
        const { tryInfo } = this.props;

        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

export default Try;