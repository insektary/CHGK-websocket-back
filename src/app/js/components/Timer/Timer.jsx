import React, {Component, Fragment} from 'react';
import {Button} from '../button/Button';
import styles from './timer.css';

const {
    item,
    circle_animation,
    circle_static
} = styles;

export class Timer extends Component {
    constructor() {
        super()
        this.state = {
            time: 60,
            interval: 0,
            isOn: false
        };
    }

    startTimer() {
        this.timer = setInterval(this.handleInterval.bind(this), 1000);

        this.setState({
            isOn: true
        });
    }

    handleInterval() {
        const {onChange} = this.props;
        const {time, interval} = this.state;

        if (onChange) onChange(prevTime + 1);

        if (interval === time) {
            clearInterval(this.timer);

            setTimeout(this.setStateDefault.bind(this), 1000);

            return;
        }

        this.setState(({interval: prevTime}) => ({
            interval: prevTime + 1 
        }));
    }

    setStateDefault() {
        this.setState({
            time: 60,
            interval: 0,
            isOn: false
        })
    }

    render() {
        const {interval, time, isOn} = this.state;
        const offset = 440 - ((440 - 126) / time) * (interval + 1);

        return (
            <Fragment>
                <div className={item}>
                    <h2>{time - interval}</h2>
                    <svg width="120" height="120">
                    <g>
                        <circle
                            className={circle_static}
                            r="50"
                            cy="60"
                            cx="60"
                            stroke-width="8"
                            stroke="rgb(202, 202, 202)"
                            fill="none"
                        />
                        <circle
                            className={circle_animation}
                            style={{
                                'stroke-dashoffset': isOn ? offset : 440
                            }}
                            r="50"
                            cy="60"
                            cx="60"
                            stroke-width="8"
                            stroke="rgb(11, 179, 11)"
                            fill="none"
                        />
                    </g>
                    </svg>
                </div>
                <Button
                    title="Запустить таймер"
                    onClick={this.startTimer.bind(this)}
                    disabled={isOn}
                />
            </Fragment>
        );        
    }
}