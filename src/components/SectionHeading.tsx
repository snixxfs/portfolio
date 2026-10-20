interface SectionHeadingProps {
  kicker: string
  heading: string
  caption?: string
  id?: string
}

export function SectionHeading({ kicker, heading, caption, id }: SectionHeadingProps) {
  const sectionNumber = kicker.match(/\d+/)?.[0];
  return (
    <div className="section-header" data-section-number={sectionNumber}>
      <p className="kicker glowable">{kicker}</p>
      <h2 className="section-heading reveal" id={id}>
        {heading}
      </h2>
      {caption ? (
        <p className="section-caption reveal">
          {caption}
        </p>
      ) : null}
    </div>
  )
}
