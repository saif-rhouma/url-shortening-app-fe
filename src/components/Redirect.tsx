import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shortenedUrlService } from '../services/shortened.service';
import { useQuery } from '@tanstack/react-query';
import LoadingAnimation from './ui/LoadingAnimation';

const Redirect = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [countdown, setCountdown] = useState<number>(5);

  const {
    data: externalLink,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['shortenedUrl', shortCode],
    queryFn: async () => {
      if (!shortCode) throw new Error('Shortcode is missing');
      const urlDetails = await shortenedUrlService.getUrlDetails(shortCode);
      return urlDetails.originalUrl;
    },
    enabled: !!shortCode,
  });

  useEffect(() => {
    if (externalLink) {
      const timer = setInterval(() => {
        if (countdown > 0) {
          setCountdown((prev) => prev - 1);
        }
      }, 1000);

      const redirectTimer = setTimeout(() => {
        window.location.href = externalLink;
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalLink]);

  if (isLoading)
    return <h2 className="text-4xl font-semibold tracking-tight text-white">Getting Information from Server</h2>;
  if (isError)
    return (
      <div className="mt-4 text-base font-semibold text-red-100">Oops, Error fetching URL. Redirecting to home...</div>
    );

  return (
    <div>
      <LoadingAnimation text={`${countdown}`} />
    </div>
  );
};
export default Redirect;
