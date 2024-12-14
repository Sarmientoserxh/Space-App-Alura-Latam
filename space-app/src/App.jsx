import styled from "styled-components";
import GlobalStyles from "./components/globalstyles";
import Header from "./components/header";
import BarraLateral from "./components/barralateral";
import Banner from "./components/banner";
import Galeria from "./components/galeria";
import fotos from "./fotos.json";
import populares from "./populares.json"
import {useEffect, useState} from "react";
import Modalzoom from "./components/modalzoom/index.jsx";
import Footer from "./components/footer/Footer.jsx";

const FondoGradiente = styled.div`
    background: linear-gradient(175deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
    width: 100%;
    min-height: 100vh;
`;

const AppContainer = styled.div`
    width: 1280px;
    max-width: 100%;
    margin: 0 auto;
`;

const MainContainer = styled.main`
    display: flex;
    gap: 24px;
`;

const ContenidoGaleria = styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const App = () => {
    const [fotosDeGaleria, setFotosDeGaleria] = useState(fotos);
    const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
    const [fotosPopulares, setFotosPopulares] = useState(populares);
    const [tag,setTag] = useState(0);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        const fotosFiltradas = fotos.filter(foto => {
            const filtroPorTag = !tag || foto.tagId === tag;
            const filtroPorTitulo = !filtro || foto.titulo.toLowerCase().includes(filtro.toLowerCase())
            return filtroPorTag && filtroPorTitulo;
        })
        setFotosDeGaleria(fotosFiltradas);
    },[filtro,tag])

    const alAlternarFavorito = (foto) => {
        if (foto.id === fotoSeleccionada?.id) {
            setFotoSeleccionada({...fotoSeleccionada, favorita: !foto.favorita})
        }

        setFotosDeGaleria(fotosDeGaleria.map((fotoGaleria) => {
            return {
                ...fotoGaleria,
                favorita: fotoGaleria.id === foto.id ? !foto.favorita : fotoGaleria.favorita
            }
        }))

    }

    return (
        <>
            <FondoGradiente>
                <GlobalStyles/>
                <AppContainer>
                    <Header
                    filtro={filtro}
                    setFiltro={setFiltro}
                    />
                    <MainContainer>
                        <BarraLateral/>
                        <ContenidoGaleria>
                            <Banner
                                texto="La galería más completa de fotos del espacio"
                                backgroundImage="/images/banner.png"
                            />
                            <Galeria
                                populares={fotosPopulares}
                                fotos={fotosDeGaleria}
                                seleccionarFoto={(foto) => setFotoSeleccionada(foto)}
                                alternarFavorito={alAlternarFavorito}
                                setTag={setTag}
                            />
                        </ContenidoGaleria>
                    </MainContainer>
                </AppContainer>
                <Modalzoom foto={fotoSeleccionada} alCerrar={() => setFotoSeleccionada(null)}
                           alAlternarFavorito={alAlternarFavorito}/>
                <Footer/>
            </FondoGradiente>
        </>
    );
};

export default App;
