import React, { PureComponent } from 'react';

class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: { a: 'b', c: 'd' },
        array: [5, 3, 6],
    };

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     else return false;
    // }

    onClick = () => {
        this.setState({
            array: [...this.state.array, 2],
        });
    };

    render() {
        console.log(`랜더링: ${this.state}`);

        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}

export default Test;