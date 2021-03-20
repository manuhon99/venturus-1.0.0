import React from 'react';
import styles from "../../styles/components/Content.module.css";

//Função que exibe a programação do dia escolhido pelo usuário
export default function tvShows({tvShowsList}) {
  return (
    

      <section className={styles.data}>
        
      </section>
  );
}

//Função para requisitar na api da rede globo a programação de acordo com a data de escolha do usuário
export async function getStaticProps({ params }) {

  {filter.map((filtered) => {
       filterByDate.push([time])
      }
    )}
  

  //Retorna a pogramação do dia escolhido
  return {
    props: {
      tvShowsList: filterByDate,
    }
  };
}

//Função para determinar a rota da aplicação de acordo com o dia escolhido
export async function getStaticPaths() {
  <Todos></Todos>
  const query = [{"day": today}, {"day": yesterday}, {"day": tomorrow}]
  return {
    paths: query.map((query_id)=> ({
      params: {
        query_id: query_id.day,
      }
    })),
  fallback:false,
  }
}


