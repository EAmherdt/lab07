import React, {Component} from 'react';
import {ToastAndroid,Button, StyleSheet, Text, TextInput, Picker, View,
Switch, CheckBox, Slider} from 'react-native';

export default class AppBanco extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mail:'',
            cuit:'',
            moneda:1,
            monto: '',
            cantidadDias: 10,
            avisoMail: false,
            flag: false,
            tasaInteres: 0,
            montoFinal: 0,
            tipoMoneda: '',
        };
        this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
        this.nuevoPlazoFijo = this.nuevoPlazoFijo.bind(this);
    }

    hacerPlazoFijo(){
        //ToastAndroid.show('Presiono el boton de hacer plazo fijo!', ToastAndroid.LONG);
        if(this.state.monto != '' && this.state.mail != '' && this.state.cuit != ''){
            if(this.state.moneda == 1){
                this.setState({
                    flag: true,
                    tipoMoneda: 'DOLAR'
                })
            }
            else{
                this.setState({
                    flag: true,
                    tipoMoneda: 'PESO'
                })
            }
            var montoo = Number(this.state.monto);

            if(montoo <= 5000 && this.state.cantidadDias < 30){
                this.state.tasaInteres = 26;
            }
            else{
                if(montoo <= 5000 && this.state.cantidadDias >= 30){
                    this.state.tasaInteres = 27.5;
                }
                else {
                    if(montoo > 5000 && montoo <= 99999 && this.state.cantidadDias < 30){
                        this.state.tasaInteres = 30;
                    }
                    else{
                        if(montoo > 5000 && montoo <= 99999 && this.state.cantidadDias >= 30){
                            this.state.tasaInteres = 32.3;
                        }
                        else{
                            if(montoo > 99999 && this.state.cantidadDias < 30){
                                this.state.tasaInteres = 35;
                            }
                            else this.state.tasaInteres = 38.5;
                        }
                    }
                }
            }
            
            this.state.montoFinal = montoo * Math.pow((1+(this.state.tasaInteres/100)),(this.state.cantidadDias/360));//(montoo * ( Math.pow((1 + (this.state.tasaInteres/100)) , (this.state.cantidadDias/360)  ) - 1 ))
        }
        else {
            alert('Complete los campos vacíos');        
        }
    }
   
    nuevoPlazoFijo(){
        //ToastAndroid.show('Presiono el boton de hacer plazo fijo!', ToastAndroid.LONG);
        this.setState({
            mail:'',
            cuit:'',
            moneda:1,
            monto: '',
            cantidadDias: 10,
            avisoMail: false,
            flag: false,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold'}}>Correo Electronico:</Text>
                <TextInput 
                    style = {{fontSize: 20, height: 40,backgroundColor: '#E6E6E6', marginBottom: 5 , marginTop: 5}}
                    placeholder = 'correo@mail.com'
                    onChangeText = {(text) => this.setState({mail: text})}
                    value = {this.state.mail}
                    >
                </TextInput>
                <Text style={{fontWeight: 'bold'}}>CUIT:</Text>
                <TextInput 
                    style = {{fontSize: 20, height: 40,backgroundColor: '#E6E6E6', marginBottom: 5 , marginTop: 5}}
                    placeholder = '00-00000000-0'
                    onChangeText = {(text) => this.setState({cuit: text})}
                    value = {this.state.cuit}
                    >
                </TextInput>
                <Text style={{fontWeight: 'bold'}}>Moneda:</Text>
                <Picker
                    style={{width: '100%', marginBottom: 10 , marginTop: 10}}
                    itemStyle={{backgroundColor:'#E6E6E6'}}
                    selectedValue={this.state.moneda}
                    onValueChange={(valor) => this.setState({moneda:valor})}>
                    <Picker.Item label="Dolar" value="1" />
                    <Picker.Item label="Pesos ARS" value="2" />
                </Picker>
                <Text style={{fontWeight: 'bold'}}>Monto:</Text>
                <TextInput
                    keyboardType = 'number-pad'
                    style = {{fontSize: 20, height: 40,backgroundColor: '#E6E6E6',marginBottom: 5 , marginTop: 5}}
                    onChangeText = {(text) => this.setState({monto: text})}
                    value = {this.state.monto} 
                    placeholder = '0'
                />
                <Text style={{fontWeight: 'bold'}}>Días:</Text>
                <View style = {{marginBottom: 5 , marginTop: 5, width: '75%', alignSelf:'center'}}>
                    <Slider 
                        onValueChange = {(cant) => this.setState({cantidadDias: cant})}
                        value= {this.state.cantidadDias}
                        minimumValue={10}
                        step={1}
                        maximumValue={180}
                        minimumTrackTintColor = '#FE2E64'
                        >
                    </Slider>
                    <Text>{this.state.cantidadDias} días.</Text>
                </View>
                <Switch 
                    onValueChange = {(aviso) => this.setState({avisoMail: aviso})}
                    value={this.state.avisoMail}
                    >
                </Switch>
                <Text style={{marginTop: 5 , fontWeight: 'bold'}}>Avisar por mail</Text>
                <CheckBox title='Acepto condiciones'/>
                
                {!(this.state.flag) && 
                <View style={{backgroundColor: '#FE2E64', marginBottom: 5 , marginTop: 5}}>
                    <Button 
                        style={styles.btn}
                        alignItems = "center"
                        title="Hacer Plazo Fijo"
                        color="#FFFFFF"
                        onPress={this.hacerPlazoFijo}>
                    </Button>
                </View>}

                {(this.state.flag) && 
                <View style={{backgroundColor: '#FE2E64', marginBottom: 5 , marginTop: 5}}>
                    <Button 
                        style={styles.btn}
                        alignItems = "center"
                        title="Nuevo Plazo Fijo"
                        color="#FFFFFF"
                        onPress={this.nuevoPlazoFijo}>
                    </Button>
                </View>}
                
                {(this.state.flag) &&
                <Text style={{color: 'blue', fontWeight: 'bold'}}>
                    El plazo fijo se realizó exitosamente. PlazoFijo(dias={this.state.cantidadDias},
                    monto={this.state.montoFinal},avisarVencimiento={this.state.avisoMail},renovarAutomaticamente=false
                    ,moneda={this.state.tipoMoneda})
                </Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:30,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
   