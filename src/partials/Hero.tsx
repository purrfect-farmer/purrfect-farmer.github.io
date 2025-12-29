import AppIcon from "@/assets/images/icon-unwrapped-cropped.png?format=webp&h=480";
import ContainerGrid from "@/components/ContainerGrid";
import HeroImage from "@/assets/images/hero.png?format=webp";
import LinkButton from "@/components/LinkButton";
import SectionHeading from "@/components/SectionHeading";
import { FaBrandsChrome, FaBrandsGithub } from "solid-icons/fa";
import { BsMouse } from "solid-icons/bs";

const HeroButton = LinkButton;

export default function Hero() {
  return (
    <div class="flex flex-col min-h-dvh">
      <ContainerGrid class="grow">
        <div class="flex flex-col gap-4 p-10 items-center  justify-center">
          {/* App Icon */}
          <img src={AppIcon} class="h-28 lg:h-36" />

          {/* Heading */}
          <SectionHeading class="text-center">Purrfect Farmer</SectionHeading>

          {/* Description */}
          <p class="font-thin max-lg:max-w-96 text-center text-2xl lg:text-3xl">
            Automate Telegram Mini-Apps easily with an advance tool.
          </p>

          {/* Buttons */}
          <div class="flex">
            <div class="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-2">
              {/* Get Extension */}
              <HeroButton
                icon={FaBrandsChrome}
                href={import.meta.env.VITE_APP_GITHUB_RELEASE}
              >
                Get Extension
              </HeroButton>

              {/* Source Codes */}
              <HeroButton
                icon={FaBrandsGithub}
                href={import.meta.env.VITE_APP_GITHUB}
              >
                Source Codes
              </HeroButton>
            </div>
          </div>
        </div>

        {/* Image of Hero */}
        <div class="relative">
          <div class="lg:absolute inset-0 flex flex-col items-center justify-center">
            <img
              src={HeroImage}
              class="rounded-xl w-130 object-contain max-h-full"
            />
          </div>
        </div>
      </ContainerGrid>

      {/* Scroll Down Indicator */}
      <div class="p-10 flex justify-center shrink-0">
        <BsMouse class="size-10 animate-bounce text-orange-500" />
      </div>
    </div>
  );
}
