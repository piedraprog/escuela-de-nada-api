import Character from '../models/Characters';


export const ListCharacters = async(req,res) =>{
    // const FindCharacter = await Character.find();
    // res.send(FindCharacter);

    res.send('entonces');
};

export const PostCharacters = async(req,res) =>{

    res.send('Personaje creado con éxito');
};