import React, { Component } from 'react';
import { View, StyleSheet, Picker } from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { HASHUNITS } from '../consts/HASHUNITS';
import colors from '../styles/colors'

class Form extends Component {
    constructor(props){
        super(props);
    }

    setHashRate(hash){
        this.props.setHash(hash);
    }

    setUnit(unit){
        this.props.setUnit(unit);
    }

    setDays(days){
        this.props.setDays(days);
    }

    render(){
        return (
            <Card title='Enter your Hashrate' 
                containerStyle={styles.cardContainer} 
                titleStyle={styles.titleStyle} >
                <View style={styles.formContainer}>
                    <View style={styles.formHashRate}>
                        <FormLabel labelStyle={styles.formLabel}>Hashrate</FormLabel>
                        <FormInput
                            containerStyle={styles.formInput}
                            underlineColorAndroid={colors.outlines}
                            keyboardType="numeric" 
                            onChangeText={(hash) => this.setHashRate(hash)}/>
                    </View>
                    <View style={styles.pickerStyles} >
                        <Picker
                            selectedValue={this.props.unit}
                            mode='dropdown'
                            style={styles.picker} 
                            onValueChange = {(unit) => this.setUnit(unit)}>
                                { HASHUNITS.map((unit) => <Picker.Item label={unit.label} value={unit} key={unit}/>) }
                        </Picker>
                    </View>                    
                </View>
                <View style={styles.daysForm}>
                        <FormLabel labelStyle={styles.formLabel}># of Days to Reinvest: </FormLabel>
                        <FormInput
                            containerStyle={styles.formInput}
                            inputStyle={{}}
                            keyboardType="numeric" 
                            onChangeText={(days) => this.setDays(days)}/>
                </View>
                <View style={styles.buttonView} >
                    <Button 
                        title='Calculate'
                        backgroundColor={colors.backgrounds}
                        buttonStyle={styles.button}
                        onPress={this.props.reinvest}
                        fontSize={18}  />
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 5,
        marginBottom: 0
    },
    titleStyle:{
        fontSize: 15,
    },
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    formLabel:{
        height: 16,
        marginTop: 0
    },
    formInput:{
         height:40,
         marginBottom:10
    },
    formHashRate:{
        flex: 1,
    },
    button:{
        width: 200,
        borderRadius: 4,
        borderColor: colors.outlines,
        borderWidth: 1.2
    },
    buttonView:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:0
    },
    pickerStyles:{
        flex: .6,
        padding: 0,
        borderRadius: 5,
        borderColor: colors.outlines,
        borderWidth: 1.3,
        marginBottom: 10
    },
    daysForm: {
        width: '63%',
        marginBottom: 5
    },
    picker:{
        padding: 0,
        margin: 0    
    }
})

export default Form;