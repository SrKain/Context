import React, { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";
const estadoInical = [];

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInical);
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const { totalTempo, quantidadeTempo } = useMemo(
    () =>
      carrinho.reduce(
        (acumulador, produto) => ({
          quantidadeTempo: acumulador.quantidadeTempo + produto.quantidade,
          totalTempo:
            acumulador.totalTempo + produto.preco * produto.quantidade,
        }),
        {
          quantidadeTempo: 0,
          totalTempo: 0,
        }
      ),
    [carrinho]
  );

  useEffect(() => {
    setQuantidade(quantidadeTempo);
    setValorTotal(totalTempo);
  });

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        dispatch,
        quantidade,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
