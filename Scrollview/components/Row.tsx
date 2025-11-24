import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

type RowProps = { //määritellään propertylle tietotyyppi typellä tai interfacella
    title: string,
    description: string,
    image: string
}

export const Row = ({ title, description, image }: RowProps) => ( //annetaan propertylle title tietotyyppi RowProps, täytyy TypeScriptissä!!
    <View style={styles.row}>
        <Image
            style={styles.image}
            source={{ uri: image }}
            resizeMode='cover'
        />
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{description}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        elevation: 2,
        padding: 16,
        marginBottom: 12,
        width: '100%'
    },
    image: {
        backgroundColor: '#ccc',
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 16
    },
    textContainer: {
      
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4
    },
    text: {
        fontSize: 14,
        color: '#555'
    }
})