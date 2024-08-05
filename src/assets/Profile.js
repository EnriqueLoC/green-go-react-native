import React, {useContext} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Modal, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../model/ThemeContext';

const { width } = Dimensions.get('window');
const numColumns = Math.floor(width / 40);
const numRows = 30;
const iconsData = Array.from({ length: numColumns * numRows });

export default function Profile() {

    const { isDarkTheme } = useContext(ThemeContext);
    const [modalVisible, setModalVisible] = React.useState(false);

    const handleImagePress = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={[styles.container, {backgroundColor: isDarkTheme ? "#111" : "#fff"}]}>
            <View style={[styles.header, {backgroundColor: isDarkTheme ? "rgba(17, 145, 0, 0.6)" : "#119100"}]}>
                <TouchableOpacity onPress={handleImagePress} style={styles.profileImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: 'https://scontent.ftrc2-1.fna.fbcdn.net/v/t1.6435-9/87509658_855124184953938_4773615425176993792_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeFqqrfbhBsFqMXz0VYYhUlLQMpnPU8DQwZAymc9TwNDBvOUi5vveSDwg5WF3B5x5Fsfby1sGG0J4R_7jnLkwIC6&_nc_ohc=orCSidxLuYoQ7kNvgGL3VDh&_nc_ht=scontent.ftrc2-1.fna&gid=AUovyNHojGALIjj_UVCDS77&oh=00_AYB2RXulNQ4hQ0fvn6WhZe2Mp89BSsrQqZOsffYcN4BQDw&oe=66D3041C' }}
                    />
                </TouchableOpacity>
                <Text style={[styles.name, styles.borderedText]}>{"Roberto Rocha"}</Text>
                <Text style={[styles.email, styles.borderedText]}>{"jroberto.rore04@gmail.com"}</Text>
                {/* <View style={styles.iconContainer}>
          {iconsData.map((_, index) => (
            index % 2 === 0 ?
              <Icon key={index} name="recycle" style={styles.icon}></Icon> :
              <View key={index} style={styles.emptyIcon}></View>
          ))}
        </View> */}
            </View>
            <View style={[styles.content, {backgroundColor: isDarkTheme ? "#222" : "#fff"}]}>
                <Text style={[styles.title, {color: isDarkTheme ? "#fff" : "#000"}]}>POINTS: {10000}</Text>
                <View style={styles.QRCode}>
                    <QRCode 
                        value='https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
                        size={200} color={isDarkTheme ? "#fff" : "#000"} 
                        backgroundColor={isDarkTheme ? "#222" : "#fff"}/>
                </View>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={handleCloseModal}
                on
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseModal}>
                        <Text style={styles.modalCloseText}>x</Text>
                    </TouchableOpacity>
                    <Image
                        style={styles.modalImage}
                        source={{ uri: 'https://scontent.ftrc2-1.fna.fbcdn.net/v/t1.6435-9/87509658_855124184953938_4773615425176993792_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeFqqrfbhBsFqMXz0VYYhUlLQMpnPU8DQwZAymc9TwNDBvOUi5vveSDwg5WF3B5x5Fsfby1sGG0J4R_7jnLkwIC6&_nc_ohc=orCSidxLuYoQ7kNvgGL3VDh&_nc_ht=scontent.ftrc2-1.fna&gid=AUovyNHojGALIjj_UVCDS77&oh=00_AYB2RXulNQ4hQ0fvn6WhZe2Mp89BSsrQqZOsffYcN4BQDw&oe=66D3041C' }}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        backgroundColor: '#119100',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative',
    },
    profileImageContainer: {
        zIndex: 2,
    },
    profileImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
        zIndex: 1,
        width: "100%",
        textAlign: "center"
    },
    email: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        zIndex: 1,
        width: "100%",
        textAlign: "center"
    },
    iconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    icon: {
        fontSize: 20,
        color: '#56e344',
        opacity: 0.5,
        margin: 0,
    },
    emptyIcon: {
        width: 20,
        height: 20,
        margin: 0,
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: -20,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        flex: 1,
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    QRCode: {
        flex: 3,
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    modalCloseButton: {
        position: 'absolute',
        top: 50,
        right: 30,
        zIndex: 1,
    },
    modalCloseText: {
        fontSize: 30,
        color: '#fff',
    },
    borderedText: {
        textShadowColor: '#000',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
});

