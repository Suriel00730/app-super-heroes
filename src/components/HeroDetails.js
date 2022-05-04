import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import heroTeamContext from '../contexts/teamContext';

const HeroDetails = () => {
    let { heroId } = useParams();
    const { heroes } = useContext(heroTeamContext);

    let hero = heroes.filter(h => h.id === heroId);

    return (
        <>
            {heroes.length > 0 ?
                <div>
                    <h2>Hero detail</h2>
                    <p><b>Weight:</b> {hero[0].appearance.weight[0]} / {hero[0].appearance.weight[1]}</p>
                    <p><b>Height:</b> {hero[0].appearance.height[1]} / {hero[0].appearance.height[0]}</p>
                    <p><b>Full name:</b> {hero[0].biography["full-name"]}</p>
                    <p><b>Alias:</b> {(hero[0].biography.aliases).map(a => (
                        <span>"{a}", </span>
                    ))}</p>
                    <p><b>Eye color:</b> {hero[0].appearance["eye-color"]}</p>
                    <p><b>Hair color:</b> {hero[0].appearance["hair-color"]}</p>
                    <p><b>Workplace:</b> {(hero[0].work.base)}</p>
                </div> : null

            }
        </>
    );
}

export default HeroDetails;