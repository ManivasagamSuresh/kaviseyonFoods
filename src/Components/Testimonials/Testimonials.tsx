import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";


function Testimonials() {
    
    const testimonials = [
        {
          message: "Kaviseyon Food’s products are a lifesaver! My baby loves the Ragi powder, and I feel so confident feeding it to her!",
          user: "Parent from Chennai",
        },
        {
          message: "The organic ingredients in the baby food are amazing! I can see the difference in my baby's health and energy.",
          user: "Parent from Madurai",
        },
        {
          message: "My child is a picky eater, but Kaviseyon Food’s snacks have become his favorite! Highly recommend them.",
          user: "Parent from Chennai",
        },
        {
          message: "I’ve never felt more confident about what my child eats. No more worries about artificial ingredients!",
          user: "Parent from Coimbatore",
        }
      ];
      
  return (
    <div className="testimonials-section p-8 sm:px-10 md:px-16 lg:p-8 mb-10 lg:mb-28">
  <h2 className="text-2xl lg:text-3xl text-themeColorDark text-center font-semibold">What Mothers think about us</h2>
  <p className="text-center text-xs lg:text-base text-lightGrey mb-8">Real feedback from our happy customers!</p>

  <div className="testimonial-carousel flex flex-col lg:flex-row gap-4">

    {
        testimonials.map((test)=>{
            return <div className="whatsapp-testimonial bg-themeColorLight rounded-lg p-4 shadow-md">
            <div className="user-message bg-white p-4 rounded-md">
                <div className='mb-5 text-themeColorDark'>
                <FaQuoteLeft size={"14px"}/>

                </div>
              <p className="text-xs lg:text-sm">
                {test.message}
              </p>
              <span className="text-[10px] lg:text-xs text-themeColorDark">- {test.user}</span>
            </div>
          </div>
        })
    }
  
    

  

  </div>
</div>

  )
}

export default Testimonials