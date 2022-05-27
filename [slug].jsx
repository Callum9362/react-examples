import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Link from 'next/link'
import _ from 'lodash'

const Genre = ({ genre, books }) => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {genre.name}
                </h2>
            }>

            <Head>
                <title>Livro - Discover {genre.name} </title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b">
                        <div className="min-h-screen flex items-center justify-center">
                            {books && books.map((book, i) =>
                                <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mt-2">
                                    <p>
                                        <Link href={`/book/${book.id}`}>
                                            <a>
                                                {_.truncate(book.title, { length: 24 })}
                                            </a>
                                        </Link>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.query;
    const result = await fetch(`http://localhost:8000/api/genres/${slug}`);
    const jsonResult = await result.json();

    return {
        props: {
            books: jsonResult.books,
            genre: jsonResult.genre,
        }
    };
};

export default Genre
