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

    // Only hard-404 when the server explicitly says the user doesn't exist.
    // Network errors / Render cold starts throw and are treated as a transient
    // failure — Next.js will retry on the next request.
    if (data.status === 'error') {
      return { notFound: true };
    }

    return {
      props: {
        userData: data.userData,
        socials: data.socials ?? null,
      },
      revalidate: 60
    };
  } catch (err) {
    // Transient error (network/timeout) — don't cache as 404, retry next visit
    throw err;
  }
}

export default Username;
