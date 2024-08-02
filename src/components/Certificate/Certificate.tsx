import React, { useState, useEffect, ChangeEvent } from 'react';
import { getCertificate, getUserCertificates } from 'crypto-pro';
import { colors } from '@mui/material';

//делаем интерфейс - и типипизируем onchange
interface CertificateProps {
  onChange: (certificate: string | null) => void; // тип параметра на функцию, принимающую сертификат
}
function Certificate({ onChange }: CertificateProps) {
  const [certificates, setCertificates] = useState([]);
  const [certificatesError, setCertificatesError] = useState([]);
  const [certificate, setCertificate] = useState(null);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [detailsError, setDetailsError] = useState(null);

  //обработчик события, который выбирает сертификат по его thumbprint и обновляет
  //состояния certificate и certificateDetails.
  //Компонент AuthorizationPage передает функцию setCertificate как проп onChange компоненту Certificate.
  //Компонент Certificate вызывает эту функцию с выбранным сертификатом, обновляя состояние certificate в AuthorizationPage
  //Теперь certificate доступен в AuthorizationPage для использования в функции createSignature.
  function selectCertificate(event: { target: { value: any } }) {
    const certificate = certificates.find(
      ({ thumbprint }) => thumbprint === event.target.value,
    );

    setCertificate(certificate ?? null);
    onChange(certificate);
  }

  async function loadCertificateDetails(thumbprint) {
    try {
      console.log('это трамблпринт', thumbprint);
      const certificate = await getCertificate(thumbprint);

      setCertificateDetails({
        Пользователь: certificate.name,
        Описание: certificate.subjectName,
        Отпечаток: certificate.thumbprint,
        Начало: certificate.validFrom,
        Действителен_до: certificate.validTo,
      });
    } catch (error) {
      setDetailsError(error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setCertificates(await getUserCertificates());
      } catch (error) {
        setCertificatesError(error.message);
      }
    })();
  });

  return (
    <>
      <label htmlFor="certificate">Выберите актуальный сертификат ЭП: </label>

      <br />

      <select
        id="certificate"
        onChange={selectCertificate}
        style={{ cursor: 'pointer' }}
      >
        <option defaultValue={null}>Не выбран</option>

        {certificates.map(({ name, thumbprint, validTo }) => (
          <option key={thumbprint} value={thumbprint}>
            {name + ' (действителен до: ' + validTo + ')'}
          </option>
        ))}
      </select>

      <pre>{certificatesError || null}</pre>

      {certificate ? (
        <>
          <details
            onClick={loadCertificateDetails.bind(this, certificate.thumbprint)}
            style={{
              textAlign: 'left',
            }}
          >
            <summary style={{ cursor: 'pointer' }}>
              Информация о сертификате
            </summary>

            <pre
              style={{
                backgroundColor: 'lightgray',
                whiteSpace: 'pre-wrap',
              }}
            >
              {certificateDetails
                ? JSON.stringify(certificateDetails, null, '  ')
                : 'Запрашивается...'}
            </pre>
          </details>

          <pre>{detailsError || null}</pre>
        </>
      ) : null}
    </>
  );
}

export default Certificate;
