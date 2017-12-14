import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Picker } from 'react-native';
import { Header, Card, FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

import Profits from './Profits';
import Projection from './Projection';
import Chart from './Chart';
import Form from './Form';

class Calculator extends Component {
    constructor(){
        super();
        this.state = {
            hashRate: 0,
            unit: "TH",
            BTC: 0,    
            maintenanceFee: .35,
            //ticker: {}
            dollarPerDay: 0,
            bitcoinPerDay: 0,
            showTheThing: false
        };

        this.setHashRate = this.setHashRate.bind(this);
    }

    componentDidMount() {
        axios.get('https://blockchain.info/q/getdifficulty')
        .then( res => {
            this.state.difficulty = res.data;
        })
        .catch( err => console.log(err));


        axios.get('https://blockchain.info/ticker')
        .then( res => {
            //this.state.ticker = res.data;
            this.state.BTC = res.data.USD.last;
        })
        .catch( err => console.log(err));
    }

    setHashRate(hash){
        this.setState({
            hashRate: hash - 0
        });
    }

    setUnit(unit){
        let fee = .35;
        if (unit === "TH") {
            fee = .35;
        } else if (unit === "GH") {
            fee = .35 * .1;
        } else if (unit === "MH") {
            fee = .35 * .01;
        } else if (unit === "KH") {
            fee = .35 * .001;
        }

        this.setState({
            unit: unit,
            maintenanceFee: fee,
        });
    }

    setSpeed(unit){
        let speed = 0;

        if (unit === "TH") {
            speed = 1000000000000;
        } else if (unit === "GH") {
            speed = 1000000000;
        } else if (unit === "MH") {
            speed = 1000000;
        } else if (unit === "KH") {
            speed = 1000;
        }

        return speed;
    }

    calculateDay = () => {
        const hashRate = this.state.hashRate;
        const unit = this.state.unit;        
        const BTC = this.state.BTC;
        const speed = this.setSpeed(unit);        
        const maintenanceFee = this.state.maintenanceFee;
        const blockReward = 12.5;
        const difficulty = this.state.difficulty;

        const hashSpeed = speed * hashRate;
        const fees = hashRate * maintenanceFee;
        const feesInBTC = fees/BTC;

        let bitcoinPerDay = (blockReward * hashSpeed * 86400) / (difficulty * Math.pow(2,32));
        bitcoinPerDay = bitcoinPerDay;
        let dollarPerDay = BTC*bitcoinPerDay - fees;
        bitcoinPerDay = bitcoinPerDay - feesInBTC; 

        this.setState({
            bitcoinPerDay: bitcoinPerDay.toFixed(8),
            dollarPerDay: dollarPerDay.toFixed(2),
            showTheThing: true
        });

    } 

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Form unit={this.state.unit} setHash={this.setHashRate} setUnit={this.setUnit} calculate={this.calculateDay}/>
                { this.state.showTheThing && 
                <View>
                    <Profits BTC={this.state.BTC} dollarPerDay={this.state.dollarPerDay} bitcoinPerDay={this.state.bitcoinPerDay} />
                    <Projection 
                        dollarPerDay={this.state.dollarPerDay} 
                        bitcoinPerDay={this.state.bitcoinPerDay}
                        hashRate={this.state.hashRate}  />
                    <Chart />
                </View>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 100
    },
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    formHashRate:{
        flex: 1,
        marginBottom: 20
    },
    pickerStyles:{
        flex: .6,
        marginBottom: 15
    },
})


export default Calculator;


// H = Hashrate (hashes / second)
// D = Difficulty (Reference for values below)
// B = Reward per Block (Reference for value below)
// N = Number of days per month (default = 30)
// S = Number of seconds per day (S = 60 * 60 * 24 = 86400)

// N * B * H * 86400 / D * 2^32