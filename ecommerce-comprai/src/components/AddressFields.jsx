import { STATES } from "../config";
import { maskCep } from "../utils/masks";
import FormField from "./FormField";

/**
 * Campos de endereço reutilizados no cadastro de cliente e no checkout.
 * @param {{ values: Object, errors: Object, onChange: Function }} props
 */
export default function AddressFields({ values, errors, onChange }) {
  return (
    <div className="row">
      <div className="col-md-4">
        <FormField
          name="cep"
          label="CEP"
          value={values.cep}
          error={errors.cep}
          onChange={onChange}
          mask={maskCep}
          inputMode="numeric"
          autoComplete="postal-code"
        />
      </div>
      <div className="col-md-6">
        <FormField
          name="endereco"
          label="Endereço"
          value={values.endereco}
          error={errors.endereco}
          onChange={onChange}
          autoComplete="street-address"
        />
      </div>
      <div className="col-md-2">
        <FormField
          name="numero"
          label="Número"
          value={values.numero}
          error={errors.numero}
          onChange={onChange}
        />
      </div>
      <div className="col-md-8">
        <FormField
          name="cidade"
          label="Cidade"
          value={values.cidade}
          error={errors.cidade}
          onChange={onChange}
          autoComplete="address-level2"
        />
      </div>
      <div className="col-md-4">
        <FormField
          name="uf"
          label="Estado (UF)"
          type="select"
          options={STATES}
          value={values.uf}
          error={errors.uf}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
