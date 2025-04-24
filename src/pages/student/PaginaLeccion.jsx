import Header from "../../components/Header";
import VisualizadoPDF from "../../components/VisualizadorPDF";

const PaginaLeccion = () =>{
    return(
        <>
            <Header/>
            <h2>{2}</h2>
            <VisualizadoPDF pdfUrl={'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'}/>
        </>
    )
}

export default PaginaLeccion;

    // const leccionActual = localStorage.getItem('leccionActual');
    // const leccionParseada = JSON.parse(leccionActual);
    // const tituloLeccion = leccionParseada.title
    // const contentUrl = leccionParseada.contentUrl;