import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDetails } from "../../utils/userDB";

export default function LoginForm() {
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      setError("");
      const { username, password } = formValue;

      if (username !== user.username || password !== user.password) {
        setError("El usuario o la contraseña no son correcto");
      } else {
        console.log("Login correcto");
        console.log(userDetails);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Button
        title="Iniciar Sesion"
        buttonStyle={{
          backgroundColor: "#6AC471",
          margin: 6,
          marginTop: 6,
          marginBottom: 0,
          borderRadius: 96,
          width: "52%",
          marginLeft: 80,
        }}
        onPress={formik.handleSubmit}
      />
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>

      <Image
        source={require("../../assets/Seek.png")}
        style={{ width: 200, height: 200, top: 66, marginLeft: 130 }}
      />
    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("El usuario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}

const styles = StyleSheet.create({
  container:{
    height: "100%",
    backgroundColor: "#CFF6FC"
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
    color: "orange",

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "pink",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 6,
  },
});
