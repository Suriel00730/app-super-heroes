import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import "./HeroSearch.css";
import heroTeamContext from '../contexts/teamContext';

const HeroSearch = () => {

    const [answer, setAnswer] = useState([])
    const [error, setError] = useState(false);

    const [alignment, setAlignment] = useState([]);
    const [message, setMessage] = useState('');

    const { heroes, powerStats, sumWeight, sumHeight,
        setHeroes, setPowerStats, setSumWeight, setSumHeight } = useContext(heroTeamContext);

    let good = heroes.filter(h => h.biography.alignment === 'good').length;
    let bad = heroes.filter(h => h.biography.alignment === 'bad').length;

    const consultApi = async (name) => {
        try {
            const r = await axios(
                `https://www.superheroapi.com/api.php/1337606366755747/search/${name}`
            );
            setAnswer(r.data.results);

        } catch (err) {
            console.log(err);
        }
    }

    const verifyExistence = id => {
        const compareHero = heroes.filter(h => h.id === id);
        if (compareHero.length === 0) return false;
        else return true;
    }

    const addHero = (hero, powerstats) => {
        setError(false);
        if (heroes.some(h => h.id === hero.id)) {
            setMessage('Is already in the team');
            setError(true)
            return;

        } else if (heroes.length === 6) {
            setMessage('You already have 6 members');
            setError(true);
            return;

        } else if (hero.biography.alignment === 'good' && good === 3) {
            setMessage('You already have 3 good ones');
            setError(true);
            return;

        } else if (hero.biography.alignment === 'bad' && bad === 3) {
            setMessage('You already have 3 Bad');
            setError(true);
            return;
        }

        setHeroes([...heroes, hero]);
        setAlignment([...alignment, hero.biography.alignment]);

        let { intelligence, strength, speed, durability, power, combat } = powerstats;

        if (isNaN(intelligence)) intelligence = parseInt(0);
        else if (isNaN(strength)) strength = parseInt(0);
        else if (isNaN(speed)) speed = parseInt(0);
        else if (isNaN(durability)) durability = parseInt(0);
        else if (isNaN(power)) power = parseInt(0);
        else if (isNaN(combat)) combat = parseInt(0);

        setPowerStats({
            intelligence: { name: 'Intelligence', value: powerStats.intelligence.value + parseInt(intelligence) },
            strength: { name: 'Strength', value: powerStats.strength.value + parseInt(strength) },
            speed: { name: 'Speed', value: powerStats.speed.value + parseInt(speed) },
            durability: { name: 'Durability', value: powerStats.durability.value + parseInt(durability) },
            power: { name: 'Power', value: powerStats.power.value + parseInt(power) },
            combat: { name: 'Combat', value: powerStats.combat.value + parseInt(combat) }
        });

        setSumWeight(sumWeight + parseInt(hero.appearance.weight[0].substring(0,
            hero.appearance.weight[1].length - 2)));

        setSumHeight(sumHeight + parseInt(hero.appearance.height[1].substring(0,
            hero.appearance.height[1].length - 2)));

    }

    return (
        <div className="cards">
            {error ? <div className='fs-4 text-danger'>{message}</div> : null}
            <Formik
                initialValues={{
                    name: ''
                }}
                validate={(values) => {
                    let errors = {}

                    if (!values.name) {
                        errors.name = 'Please enter a name';
                    }

                    return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    consultApi(values.name);
                }}
            >
                {({ errors }) => (
                    <Form>

                        <div className='text-center fs-2 fw-bold'>Search</div>
                        <div className='container d-flex justify-content-between'>

                            <div className='formSearch'>
                                <div className='fs-6 fw-bold mt-3' htmlFor='name'>Name</div>
                                <Field
                                    type='text'
                                    id='name'
                                    name='name'
                                    placeholder='name'
                                    className='form-control mb-4'
                                />
                                <ErrorMessage name="name" component={() => (
                                    <div className='error text-danger'>{errors.name}</div>
                                )} />
                                <div class="d-grid gap-2">
                                    <button
                                        type='submit'
                                        className='btn btn-secondary'
                                    >Search</button>
                                </div>
                            </div>
                            <div className='answer-heroes'>
                                {
                                    answer.map(hero => (
                                        <div className='card d-line-flex m-3'>
                                            <div className='name '>{hero.name}</div>
                                            <img src={hero && hero.image.url} className='mb-0' alt='hero' /><br />
                                            {verifyExistence(hero.id) === false ?
                                                <button
                                                    onClick={() => addHero(hero, hero.powerstats)}
                                                    className='button'
                                                >Add to team</button>
                                                :
                                                <div className='aggregate'>Added</div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default HeroSearch;