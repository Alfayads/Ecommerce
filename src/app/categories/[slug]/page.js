export default function CategoryPage({ params }) {
  const { slug } = params;

  return (
    <div>
      <h1>Category: {slug}</h1>
      {/* You can add more content related to the category here */}
    </div>
  );
}