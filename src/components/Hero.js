import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import heroTeamContext from '../contexts/teamContext';

const Hero = ({ hero, setHeroes }) => {

    const { powerStats, sumWeight, sumHeight, setPowerStats, setSumWeight, setSumHeight, } =
        useContext(heroTeamContext);

    let { intelligence, strength, speed, durability, power, combat } = hero.powerstats;

    const removeHero = (id) => {

        setHeroes(prevState => {
            const heroResult = prevState.filter(h => h.id !== id);
            return heroResult;
        })

        if (isNaN(intelligence)) intelligence = parseInt(0);
        else if (isNaN(strength)) strength = parseInt(0);
        else if (isNaN(speed)) speed = parseInt(0);
        else if (isNaN(durability)) durability = parseInt(0);
        else if (isNaN(power)) power = parseInt(0);
        else if (isNaN(combat)) combat = parseInt(0);

        setPowerStats({
            intelligence: { name: 'Intelligence', value: powerStats.intelligence.value - parseInt(intelligence) },
            strength: { name: 'Strength', value: powerStats.strength.value - parseInt(strength) },
            speed: { name: 'Speed', value: powerStats.speed.value - parseInt(speed) },
            durability: { name: 'Durability', value: powerStats.durability.value - parseInt(durability) },
            power: { name: 'Power', value: powerStats.power.value - parseInt(power) },
            combat: { name: 'Combat', value: powerStats.combat.value - parseInt(combat) }
        })

        setSumWeight(sumWeight - parseInt(hero.appearance.weight[0]
            .substring(0, hero.appearance.weight[1].length - 2)));

        setSumHeight(sumHeight - parseInt(hero.appearance.height[1]
            .substring(0, hero.appearance.height[1].length - 2)));
    }


    return (
        <>
            <div className="wrap">
                <div className="tarjeta-wrap">
                    <div className="tarjeta">
                        <div className="adelante card1">
                            <img src={hero.image.url} alt='hero' />
                        </div>
                        <div className="atras">
                            <div className='name'>{hero.name}</div>

                            <div className='powerstats d-line-flex justify-content-end'>
                                <div>Intelligence: {hero.powerstats.intelligence}</div>
                                <div>Strength: {hero.powerstats.strength}</div>
                                <div>Speed: {hero.powerstats.speed}</div>
                                <div>Durability: {hero.powerstats.durability}</div>
                                <div>Power: {hero.powerstats.power}</div>
                                <div>Combat: {hero.powerstats.combat}</div>
                            </div>

                            <div className='buttons'>
                                <Link
                                    className='detail'
                                    to={`/hero/${hero.id}`}>Detalles
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => removeHero(hero.id)}
                                    className='remove'>Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;