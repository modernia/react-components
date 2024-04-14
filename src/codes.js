function asignarFormatoPorDigitos(ladas) {
  let ladasFormato = {};

  ladas.forEach(lada => {
      if (lada.length === 3) {
          ladasFormato[lada] = '(000) 000 00 00';
      } else if (lada.length === 2) {
          ladasFormato[lada] = '(00) 0000 0000';
      }
  });

  return ladasFormato;
}

// Lista representativa de algunas ladas en México (ampliable)
let ladas = [
  '55', '56', '33', '81', '222', '999', '961', '644', '664', '443', '871', '312', '984',
  '429', '758', '773', '774', '775', '776', '777', '834', '861', '899', '938', '951',
  '981', '983', '985', '987', '993', '998'
];

// Asignar formatos a las ladas basado en su longitud
let ladasConFormato = asignarFormatoPorDigitos(ladas);

console.log(ladasConFormato);