import React, { useContext, useEffect } from 'react';
import "./Home.css";
import heroTeamContext from '../contexts/teamContext';
import Hero from './Hero';

const Home = () => {

    const { heroes, powerStats, averageWeight, averageHeight, sumWeight, sumHeight,
        setHeroes, setAverageWeight, setAverageHeight } = useContext(heroTeamContext);

    const { intelligence, strength, speed, durability, power, combat } = powerStats;

    let max = Math.max(...[intelligence.value, strength.value, speed.value,
    durability.value, power.value, combat.value]);

    let namePowerStats = '';

    useEffect(() => {
        setAverageWeight((sumWeight / heroes.length).toFixed(1));
        setAverageHeight((sumHeight / heroes.length).toFixed(1));

        // eslint-disable-next-line
    }, [sumWeight, sumHeight]);

    for (const property in powerStats) {

        if (powerStats[property].value === max) {
            namePowerStats = powerStats[property].name;
        }
    }


    return (
        <>
            {/* style={{ border: 'solid 2px black' }} */}
            <div className='text-center'>
                <h1>Team Members</h1>
            </div>
            <div className='d-flex justify-content-between'>
                <div>
                    <div className='fs-5 bold fw-bold'>Equipment category: {namePowerStats}</div>
                    <div className='my-1'>Average weight: {isNaN(averageWeight) ? 0 : averageWeight} lb</div>
                    <div className='my-1'>Average height: {isNaN(averageHeight) ? 0 : averageHeight} cm</div>
                    <hr />

                    <div className='fs-5 bold fw-bold'>Cumulative of PowerStats</div>
                    <div className='my-1'>total intelligence: {intelligence.value}</div>
                    <div className='my-1'>total strength: {strength.value}</div>
                    <div className='my-1'>total speed: {speed.value}</div>
                    <div className='my-1'>total durability: {durability.value}</div>
                    <div className='my-1'>total power: {power.value}</div>
                    <div className='my-1'>total combat: {combat.value}</div>

                </div>
                <div className=''>
                    {
                        heroes.length === 0 ?
                            <div className='fs-5 fst-italic ' style={{ border: 'solid 2px black' }}>
                                There are no heroes in the team
                            </div>
                            :
                            <div className="App" >
                                {heroes.map(hero => (
                                    <Hero
                                        key={hero.id}
                                        hero={hero}
                                        setHeroes={setHeroes}
                                    />
                                ))}
                            </div>
                    }
                </div>
            </div>
        </>

    );
}

export default Home;