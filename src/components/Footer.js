import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { AdMobBanner, PublisherBanner, AdMobRewarded } from 'expo';
import { config } from '../config'
import colors from '../styles/colors'

const ADUNITID = config.admob;
const BANNER_ID  = config.banner_id;

const Footer = () => {

    return (
        <View style={styles.footerContainer} >
            <Text 
                style={styles.footer} 
                onPress={() => Linking.openURL(config.reflink)}>
                {config.reflink}
            </Text>

            <AdMobBanner
                bannerSize="banner"
                adUnitID={BANNER_ID}
                testDeviceID="EMULATOR"
                didFailToReceiveAdWithError={this.bannerError} />
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        display: "flex",
        alignItems: "center"        
    },
    footer: {
        fontWeight: "bold",
        fontSize: 17,
        textAlign: 'center',
        color: colors.gold,
    },

})

export default Footer;