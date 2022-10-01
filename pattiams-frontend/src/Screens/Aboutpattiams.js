import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const AboutPattiams = () => {
  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onTop();
  }, []);

  return (
    <Container className="my-5 about-page">
      <h1>About Pattiams</h1>
      <h4>History</h4>
      <div className="long-paras">
        <p>
          The History As recent as three decades ago, the economy of Pattiam and
          East Kathiroor in North Kerala was in total doldrums with extreme
          poverty, hunger and near-total unemployment. It was the far-sighted
          vision of Sri. P Jayarajan and Comrades, that brought about a stunning
          transformation to the area, with several of its productive initiatives
          now bringing sustainable income.
        </p>
        <p>
          "A true revolutionary is guided by a great feeling of love for
          humanity," said by formers, who were appalled by the misery around
          them, and strived earnestly day after day to transform this love for
          our people into deeds that would finally lead to the formation of
          small industrial clusters. The first of the lot was an Arts and Sports
          Club for organizing the youth, followed by a milk producers'
          co-operative society that soon became a huge success. And from the
          success of that small unit, was born the Pattiam Social Service
          Society in 1995. It was registered under Section 21 of the Madras
          State Charitable Society Act-1860.
        </p>
        <p>
          The beginnings were not easy. The first phase of activities began only
          in 2004 with the production and distribution of wooden furniture. The
          long road was ridden with difficulties, yet, the Pattiam Social
          Service Society soon became a symbol of hope for the villagers. The
          society, under the capable leadership of Sri. P. Jayarajan soon
          realized that priority should be given to the eradication of diseases
          from the villages. Guided by the wisdom and experience of Sri. Rajan
          Vaidyar, an Ayurvedic and traditional medicine manufacturing unit with
          all modern facilities was set up at Pattiam, Kizhakke Kathirur. As the
          Governing Committee of Pattiam Social Service Society has
          employees/employee representatives as members, it is possible to move
          forward by maintaining team spirit in all activities.
        </p>
        <p>
          The society trained dozens of villagers in the manufacturing process
          and this unit that now works from early morning to late night, sells
          more than 350 medicines, including 20 + patented ones. What is even
          more astonishing is the fact that it is mostly run by women - from
          Ayurveda doctors to chemists and quality controllers. It was quite an
          achievement for the Society, which never gave up its faith that the
          women of Pattiam can work efficiently and be financially independent
          rather than being confined to their homes.
        </p>
        <p>
          After Mr. P. Jayarajan stepped down from the administrative leadership
          of the society, Mr. V. Rajan Master took over the administration for 3
          years.
        </p>
        <p>
          The women of Pattiam became involved not just in the production of
          Ayurvedic and herbal medicines, but even in furniture manufacturing,
          thus heralding revolutionary changes in the social sphere. Unlike
          other rural areas in the state, the sight of women returning home at
          ten o clock in the night after work is nothing unusual in Pattiam.
          Presently the chairman of the Society, Sri Anand K. P., believes that
          the Society will soon be able to run the pharmaceutical unit 24x7.
        </p>
        <p>
          The Pattiam Service Society, and with it, the rural economy too, grew
          in leaps and bounds, and so did the fame of Pattiam products.
          Unemployment, hunger, and diseases began to ebb away. The Society, now
          functioning with Sri C. Prakashan as Managing Director, employs more
          than a hundred individuals directly and many more, indirectly. The
          path towards further development through diversification is clearly in
          sight with units that manufacture cosmetics and healthy food products
          are already in the pipeline. This decentralized model of development,
          taking into account the needs of the local people, has won the hearts
          of not just the natives of Pattiam and East Kathiroor, but also the
          people of Kannur as a whole. Society has absolutely no doubt that the
          Pattiam model, with the declared objectives of developing creative
          talent of the people and uplifting the work ethics, is one that should
          be adopted for the whole of Kerala.
        </p>
      </div>
    </Container>
  );
};

export default AboutPattiams;
