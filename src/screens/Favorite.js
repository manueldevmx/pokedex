import React, { useState, useCallback } from "react";
import { Text,StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getPokemonsFavoriteApi } from "../api/favorite";
import { getPokemonDetailsApi } from "../api/pokemon";
import useAuth from "../hooks/useAuth";
import PokemonList from "../components/PokemonList";

export default function Favorite() {
  const [pokemons, setPokemons] = useState([]);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonsFavoriteApi();

          const pokemonsArray = [];
          for await (const id of response) {
            const pokemonDetails = await getPokemonDetailsApi(id);

            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              image:
                pokemonDetails.sprites.other["official-artwork"].front_default,
            });
          }

          setPokemons(pokemonsArray);
        })();
      }
    }, [auth])
  );

  return !auth ? (
   
    <Text style={styles.title}>Para visualizar tus favoritos debes iniciar sesión</Text>
      
  ) : (
    <PokemonList pokemons={pokemons} />
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 50,
   marginHorizontal: 15,
    color: "#0F4E66",

  },
})