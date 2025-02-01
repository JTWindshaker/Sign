import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { addRequest, deleteRequest, getRequests } from '../../domain/usecases/requestUseCases';
import TopBar from '../../../../core/ui/TopBar';
import { APP_NAME } from '../../../../core/common/constants';
import { COLORS, FONTS } from '../../../../core/common/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';


const RequestScreen = () => {
    const [requests, setRequests] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        getRequests(setRequests);
    }, []);

    const handleFabPress = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handlePickPdf = async () => {
        console.log("Abriendo cargar archivo");
        // try {
        //     const [result] = await pick({
        //         mode: 'open',
        //         type: types.pdf,
        //     })
        //     console.log(result)
        // } catch (err) {
        //     if (pick.isCancel(err)) {
        //         console.log('User cancelled document picker');
        //     } else {
        //         console.error('Error picking document', err);
        //     }
        // }


        // try {
        //     const result = await pick.pickSingle({
        //         type: types.pdf,
        //     });

        //     if (result) {
        //         navigation.navigate('PdfPreviewScreen', {
        //             uri: result.uri,
        //             name: result.name,
        //         });
        //     }
        // } catch (err) {
        //     if (pick.isCancel(err)) {
        //         console.log('User cancelled document picker');
        //     } else {
        //         console.error('Error picking document', err);
        //     }
        // }
    };

    const handleDeleteRequest = (id) => {
        deleteRequest(id);
        getRequests(setRequests);
    };

    return (
        <View style={styles.container}>
            <TopBar title={APP_NAME} leftIcon="favicon.ico" />

            <FlatList
                data={requests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Text>{item.url}</Text>
                        <Text>{item.is_sign ? 'Firmado' : 'No firmado'}</Text>
                        <Text>{item.sign_date}</Text>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteRequest(item.id)}>
                            <Icon
                                name="delete"
                                size={24}
                                color={COLORS.onSurface}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Overlay */}
            {isMenuOpen && <View style={styles.overlay} />}

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
                <Icon
                    name={isMenuOpen ? 'close' : 'add'}
                    size={40}
                    color={COLORS.onPrimary}
                    style={styles.fabIcon}
                />
            </TouchableOpacity>

            {/* Submenu buttons */}
            {isMenuOpen && (
                <View style={styles.subMenu}>
                    <TouchableOpacity style={styles.subMenuButton} onPress={() => alert('Botón 1')}>
                        <Icon
                            name="camera-alt"
                            size={40}
                            color={COLORS.onSurface}
                            style={styles.subMenuIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuButton} onPress={() => alert('Botón 2')}>
                        <Icon
                            name="image-search"
                            size={40}
                            color={COLORS.onSurface}
                            style={styles.subMenuIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMenuButton} onPress={handlePickPdf}>
                        <Icon
                            name="upload-file"
                            size={40}
                            color={COLORS.onSurface}
                            style={styles.subMenuIcon}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    item: {
        marginBottom: 12,
        padding: 12,
        backgroundColor: '#f4f4f4',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    subMenu: {
        position: 'absolute',
        bottom: 100,
        right: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
    },
    subMenuButton: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: COLORS.secondary,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
    subMenuIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
        padding: 10,
    },
});

export default RequestScreen;