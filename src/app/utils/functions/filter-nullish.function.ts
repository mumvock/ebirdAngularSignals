import { Observable, OperatorFunction, UnaryFunction, filter, pipe } from "rxjs";

/**
 * Operador customizado para RxJs que garante que apenas stream
 * de dado válido chegue ao `next`.
 *
 * Filtra observable com valor `null` ou `undefined` e evita que stream
 * de dado prossiga caso valor seja filtrado.
 *
 * @returns Observable de valor que não seja `null` e nem `undefined`.
 */
export function filterNullish<T>(): UnaryFunction<
    Observable<T | null | undefined>,
    Observable<T>
> {
    return pipe(
        filter((value) => value != null) as OperatorFunction<T | null | undefined, T>
    );
}
