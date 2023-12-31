import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home(whom) {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListings = async (type, whom) => {
      try {
        const res = await fetch(`/api/listing/get?type=${type}&limit=4&whom=${whom}`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const fetchAllListings = async () => {
      try {
        // Fetch listings for 'boys'
        const boysOfferListings = await fetchListings('offer', 'boys');
        setOfferListings((prev) => [...prev, ...boysOfferListings]);

        const boysRentListings = await fetchListings('rent', 'boys');
        setRentListings((prev) => [...prev, ...boysRentListings]);

        const boysSaleListings = await fetchListings('sale', 'boys');
        setSaleListings((prev) => [...prev, ...boysSaleListings]);

        // Fetch listings for 'girls'
        const girlsOfferListings = await fetchListings('offer', 'girls');
        setOfferListings((prev) => [...prev, ...girlsOfferListings]);

        const girlsRentListings = await fetchListings('rent', 'girls');
        setRentListings((prev) => [...prev, ...girlsRentListings]);

        const girlsSaleListings = await fetchListings('sale', 'girls');
        setSaleListings((prev) => [...prev, ...girlsSaleListings]);

        // Fetch listings for 'both'
        const bothOfferListings = await fetchListings('offer', 'both');
        setOfferListings((prev) => [...prev, ...bothOfferListings]);

        const bothRentListings = await fetchListings('rent', 'both');
        setRentListings((prev) => [...prev, ...bothRentListings]);

        const bothSaleListings = await fetchListings('sale', 'both');
        setSaleListings((prev) => [...prev, ...bothSaleListings]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          PgFinder is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>
      

      {/* Listing results for offer, sale, and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
    
      
      {rentListings && rentListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
              Show more places for rent
            </Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
      {saleListings && saleListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for PG</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={`/search?type=sale&${whom}`}>
              Show more places for PG
            </Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
