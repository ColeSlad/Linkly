import LinkTree from '../components/LinkTree'
import Link from 'next/link';
import SocialTree from '../components/SocialTree';
import ShareButton from '../components/ShareButton';
import NavBar from '@/components/Navbar';

// Dynamic profile page at /[username]
// Uses ISR: page is cached on Vercel's edge after first visit.
// Render server only needs to be awake for cache misses/revalidations.
const Username = ({ userData, socials }) => {
  return (
    <div>
      <NavBar />
      <ShareButton />
      <LinkTree data={userData} />
      <SocialTree socials={socials} />
    </div>
  )
}

export async function getStaticPaths() {
  // Don't pre-build any pages at deploy time.
  // Pages are generated on first request then cached.
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const { username } = params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get/${username}`);
    const data = await res.json();

    if (data.status !== 'success') {
      return { notFound: true };
    }

    return {
      props: {
        userData: data.userData,
        socials: data.socials ?? null,
      },
      revalidate: 60 // rebuild cached page in background every 60 seconds
    };
  } catch (err) {
    return { notFound: true };
  }
}

export default Username;
