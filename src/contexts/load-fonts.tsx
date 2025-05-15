import { createContext, useContext } from "react";
import { z } from "zod";

// Import each font individually
import * as Abel from "@remotion/google-fonts/Abel";
import * as AbrilFatface from "@remotion/google-fonts/AbrilFatface";
import * as Acme from "@remotion/google-fonts/Acme";
import * as AkayaKanadaka from "@remotion/google-fonts/AkayaKanadaka";
import * as AkayaTelivigala from "@remotion/google-fonts/AkayaTelivigala";
import * as AlfaSlabOne from "@remotion/google-fonts/AlfaSlabOne";
import * as Alkatra from "@remotion/google-fonts/Alkatra";
import * as Allura from "@remotion/google-fonts/Allura";
import * as AmaticSC from "@remotion/google-fonts/AmaticSC";
import * as Amita from "@remotion/google-fonts/Amita";
import * as Anton from "@remotion/google-fonts/Anton";
import * as ArchivoNarrow from "@remotion/google-fonts/ArchivoNarrow";
import * as Arimo from "@remotion/google-fonts/Arimo";
import * as Arizonia from "@remotion/google-fonts/Arizonia";
import * as Arvo from "@remotion/google-fonts/Arvo";
import * as Asap from "@remotion/google-fonts/Asap";
import * as Assistant from "@remotion/google-fonts/Assistant";
import * as AveriaLibre from "@remotion/google-fonts/AveriaLibre";
import * as Barlow from "@remotion/google-fonts/Barlow";
import * as BarlowCondensed from "@remotion/google-fonts/BarlowCondensed";
import * as BebasNeue from "@remotion/google-fonts/BebasNeue";
import * as Bitter from "@remotion/google-fonts/Bitter";
import * as Boogaloo from "@remotion/google-fonts/Boogaloo";
import * as BraahOne from "@remotion/google-fonts/BraahOne";
import * as BreeSerif from "@remotion/google-fonts/BreeSerif";
import * as BungeeSpice from "@remotion/google-fonts/BungeeSpice";
import * as Cabin from "@remotion/google-fonts/Cabin";
import * as Cairo from "@remotion/google-fonts/Cairo";
import * as CarterOne from "@remotion/google-fonts/CarterOne";
import * as Catamaran from "@remotion/google-fonts/Catamaran";
import * as Charm from "@remotion/google-fonts/Charm";
import * as CinzelDecorative from "@remotion/google-fonts/CinzelDecorative";
import * as Coiny from "@remotion/google-fonts/Coiny";
import * as Comfortaa from "@remotion/google-fonts/Comfortaa";
import * as CormorantGaramond from "@remotion/google-fonts/CormorantGaramond";
import * as Courgette from "@remotion/google-fonts/Courgette";
import * as CrimsonText from "@remotion/google-fonts/CrimsonText";
import * as Cuprum from "@remotion/google-fonts/Cuprum";
import * as DancingScript from "@remotion/google-fonts/DancingScript";
import * as DMSans from "@remotion/google-fonts/DMSans";
import * as Dosis from "@remotion/google-fonts/Dosis";
import * as EBGaramond from "@remotion/google-fonts/EBGaramond";
import * as Exo from "@remotion/google-fonts/Exo";
import * as Exo2 from "@remotion/google-fonts/Exo2";
import * as FiraSans from "@remotion/google-fonts/FiraSans";
import * as FjallaOne from "@remotion/google-fonts/FjallaOne";
import * as FrancoisOne from "@remotion/google-fonts/FrancoisOne";
import * as Fraunces from "@remotion/google-fonts/Fraunces";
import * as GreatVibes from "@remotion/google-fonts/GreatVibes";
import * as Heebo from "@remotion/google-fonts/Heebo";
import * as Hind from "@remotion/google-fonts/Hind";
import * as HindSiliguri from "@remotion/google-fonts/HindSiliguri";
import * as Honk from "@remotion/google-fonts/Honk";
import * as IBMPlexSans from "@remotion/google-fonts/IBMPlexSans";
import * as Inconsolata from "@remotion/google-fonts/Inconsolata";
import * as IndieFlower from "@remotion/google-fonts/IndieFlower";
import * as Inter from "@remotion/google-fonts/Inter";
import * as JosefinSans from "@remotion/google-fonts/JosefinSans";
import * as Jua from "@remotion/google-fonts/Jua";
import * as Kalam from "@remotion/google-fonts/Kalam";
import * as KalniaGlaze from "@remotion/google-fonts/KalniaGlaze";
import * as Kanit from "@remotion/google-fonts/Kanit";
import * as Karla from "@remotion/google-fonts/Karla";
import * as Lato from "@remotion/google-fonts/Lato";
import * as LibreBaskerville from "@remotion/google-fonts/LibreBaskerville";
import * as LibreFranklin from "@remotion/google-fonts/LibreFranklin";
import * as LilitaOne from "@remotion/google-fonts/LilitaOne";
import * as Lobster from "@remotion/google-fonts/Lobster";
import * as Lora from "@remotion/google-fonts/Lora";
import * as MadimiOne from "@remotion/google-fonts/MadimiOne";
import * as Manrope from "@remotion/google-fonts/Manrope";
import * as MavenPro from "@remotion/google-fonts/MavenPro";
import * as Merienda from "@remotion/google-fonts/Merienda";
import * as Merriweather from "@remotion/google-fonts/Merriweather";
import * as MerriweatherSans from "@remotion/google-fonts/MerriweatherSans";
import * as Montserrat from "@remotion/google-fonts/Montserrat";
import * as Mukta from "@remotion/google-fonts/Mukta";
import * as Mulish from "@remotion/google-fonts/Mulish";
import * as NanumGothic from "@remotion/google-fonts/NanumGothic";
import * as NotoSans from "@remotion/google-fonts/NotoSans";
import * as NotoSansJP from "@remotion/google-fonts/NotoSansJP";
import * as NotoSansKR from "@remotion/google-fonts/NotoSansKR";
import * as NotoSansSC from "@remotion/google-fonts/NotoSansSC";
import * as NotoSansTC from "@remotion/google-fonts/NotoSansTC";
import * as NotoSerif from "@remotion/google-fonts/NotoSerif";
import * as Nunito from "@remotion/google-fonts/Nunito";
import * as NunitoSans from "@remotion/google-fonts/NunitoSans";
import * as OleoScript from "@remotion/google-fonts/OleoScript";
import * as OpenSans from "@remotion/google-fonts/OpenSans";
import * as Oswald from "@remotion/google-fonts/Oswald";
import * as Overpass from "@remotion/google-fonts/Overpass";
import * as Oxygen from "@remotion/google-fonts/Oxygen";
import * as Pacifico from "@remotion/google-fonts/Pacifico";
import * as Pangolin from "@remotion/google-fonts/Pangolin";
import * as Parisienne from "@remotion/google-fonts/Parisienne";
import * as PermanentMarker from "@remotion/google-fonts/PermanentMarker";
import * as Play from "@remotion/google-fonts/Play";
import * as PlayfairDisplay from "@remotion/google-fonts/PlayfairDisplay";
import * as PoiretOne from "@remotion/google-fonts/PoiretOne";
import * as Poppins from "@remotion/google-fonts/Poppins";
import * as PottaOne from "@remotion/google-fonts/PottaOne";
import * as Prompt from "@remotion/google-fonts/Prompt";
import * as PTSans from "@remotion/google-fonts/PTSans";
import * as PTSansCaption from "@remotion/google-fonts/PTSansCaption";
import * as PTSansNarrow from "@remotion/google-fonts/PTSansNarrow";
import * as PTSerif from "@remotion/google-fonts/PTSerif";
import * as Questrial from "@remotion/google-fonts/Questrial";
import * as Quicksand from "@remotion/google-fonts/Quicksand";
import * as Rajdhani from "@remotion/google-fonts/Rajdhani";
import * as Rakkas from "@remotion/google-fonts/Rakkas";
import * as Raleway from "@remotion/google-fonts/Raleway";
import * as RampartOne from "@remotion/google-fonts/RampartOne";
import * as Righteous from "@remotion/google-fonts/Righteous";
import * as Roboto from "@remotion/google-fonts/Roboto";
import * as RobotoCondensed from "@remotion/google-fonts/RobotoCondensed";
import * as RobotoMono from "@remotion/google-fonts/RobotoMono";
import * as RobotoSlab from "@remotion/google-fonts/RobotoSlab";
import * as Rokkitt from "@remotion/google-fonts/Rokkitt";
import * as Rubik from "@remotion/google-fonts/Rubik";
import * as ShadowsIntoLight from "@remotion/google-fonts/ShadowsIntoLight";
import * as Signika from "@remotion/google-fonts/Signika";
import * as Skranji from "@remotion/google-fonts/Skranji";
import * as Slabo27px from "@remotion/google-fonts/Slabo27px";
import * as SourceCodePro from "@remotion/google-fonts/SourceCodePro";
import * as Teko from "@remotion/google-fonts/Teko";
import * as TitilliumWeb from "@remotion/google-fonts/TitilliumWeb";
import * as Ubuntu from "@remotion/google-fonts/Ubuntu";
import * as UbuntuCondensed from "@remotion/google-fonts/UbuntuCondensed";
import * as VarelaRound from "@remotion/google-fonts/VarelaRound";
import * as Vollkorn from "@remotion/google-fonts/Vollkorn";
import * as WorkSans from "@remotion/google-fonts/WorkSans";
import * as YatraOne from "@remotion/google-fonts/YatraOne";
import * as YanoneKaffeesatz from "@remotion/google-fonts/YanoneKaffeesatz";
import * as YuseiMagic from "@remotion/google-fonts/YuseiMagic";

// Load all fonts immediately
Abel.loadFont();
AbrilFatface.loadFont();
Acme.loadFont();
AkayaKanadaka.loadFont();
AkayaTelivigala.loadFont();
AlfaSlabOne.loadFont();
Alkatra.loadFont();
Allura.loadFont();
AmaticSC.loadFont();
Amita.loadFont();
Anton.loadFont();
ArchivoNarrow.loadFont();
Arimo.loadFont();
Arizonia.loadFont();
Arvo.loadFont();
Asap.loadFont();
Assistant.loadFont();
AveriaLibre.loadFont();
Barlow.loadFont();
BarlowCondensed.loadFont();
BebasNeue.loadFont();
Bitter.loadFont();
Boogaloo.loadFont();
BraahOne.loadFont();
BreeSerif.loadFont();
BungeeSpice.loadFont();
Cabin.loadFont();
Cairo.loadFont();
CarterOne.loadFont();
Catamaran.loadFont();
Charm.loadFont();
CinzelDecorative.loadFont();
Coiny.loadFont();
Comfortaa.loadFont();
CormorantGaramond.loadFont();
Courgette.loadFont();
CrimsonText.loadFont();
Cuprum.loadFont();
DancingScript.loadFont();
DMSans.loadFont();
Dosis.loadFont();
EBGaramond.loadFont();
Exo.loadFont();
Exo2.loadFont();
FiraSans.loadFont();
FjallaOne.loadFont();
FrancoisOne.loadFont();
Fraunces.loadFont();
GreatVibes.loadFont();
Heebo.loadFont();
Hind.loadFont();
HindSiliguri.loadFont();
Honk.loadFont();
IBMPlexSans.loadFont();
Inconsolata.loadFont();
IndieFlower.loadFont();
Inter.loadFont();
JosefinSans.loadFont();
Jua.loadFont();
Kalam.loadFont();
KalniaGlaze.loadFont();
Kanit.loadFont();
Karla.loadFont();
Lato.loadFont();
LibreBaskerville.loadFont();
LibreFranklin.loadFont();
LilitaOne.loadFont();
Lobster.loadFont();
Lora.loadFont();
MadimiOne.loadFont();
Manrope.loadFont();
MavenPro.loadFont();
Merienda.loadFont();
Merriweather.loadFont();
MerriweatherSans.loadFont();
Montserrat.loadFont();
Mukta.loadFont();
Mulish.loadFont();
NanumGothic.loadFont();
NotoSans.loadFont();
NotoSansJP.loadFont();
NotoSansKR.loadFont();
NotoSansSC.loadFont();
NotoSansTC.loadFont();
NotoSerif.loadFont();
Nunito.loadFont();
NunitoSans.loadFont();
OleoScript.loadFont();
OpenSans.loadFont();
Oswald.loadFont();
Overpass.loadFont();
Oxygen.loadFont();
Pacifico.loadFont();
Pangolin.loadFont();
Parisienne.loadFont();
PermanentMarker.loadFont();
Play.loadFont();
PlayfairDisplay.loadFont();
PoiretOne.loadFont();
Poppins.loadFont();
PottaOne.loadFont();
Prompt.loadFont();
PTSans.loadFont();
PTSansCaption.loadFont();
PTSansNarrow.loadFont();
PTSerif.loadFont();
Questrial.loadFont();
Quicksand.loadFont();
Rajdhani.loadFont();
Rakkas.loadFont();
Raleway.loadFont();
RampartOne.loadFont();
Righteous.loadFont();
Roboto.loadFont();
RobotoCondensed.loadFont();
RobotoMono.loadFont();
RobotoSlab.loadFont();
Rokkitt.loadFont();
Rubik.loadFont();
ShadowsIntoLight.loadFont();
Signika.loadFont();
Skranji.loadFont();
Slabo27px.loadFont();
SourceCodePro.loadFont();
Teko.loadFont();
TitilliumWeb.loadFont();
Ubuntu.loadFont();
UbuntuCondensed.loadFont();
VarelaRound.loadFont();
Vollkorn.loadFont();
WorkSans.loadFont();
YatraOne.loadFont();
YanoneKaffeesatz.loadFont();
YuseiMagic.loadFont();

// Define available font names
const FONT_NAMES = [
  "Abel",
  "AbrilFatface",
  "Acme",
  "Akaya Kanadaka",
  "Akaya Telivigala",
  "Alfa Slab One",
  "Alkatra",
  "Allura",
  "AmaticSC",
  "Amita",
  "Anton",
  "ArchivoNarrow",
  "Arimo",
  "Arizonia",
  "Arvo",
  "Asap",
  "Assistant",
  "Averia Libre",
  "Barlow",
  "BarlowCondensed",
  "BebasNeue",
  "Bitter",
  "Boogaloo",
  "Braah One",
  "BreeSerif",
  "Bungee Spice",
  "Cabin",
  "Cairo",
  "Carter One",
  "Catamaran",
  "Charm",
  "Cinzel Decorative",
  "Coiny",
  "Comfortaa",
  "CrimsonText",
  "Courgette",
  "Cuprum",
  "Dancing Script",
  "Cormorant Garamond",
  "DM Sans",
  "Dosis",
  "EBGaramond",
  "Exo",
  "Exo2",
  "FiraSans",
  "FjallaOne",
  "FrancoisOne",
  "Fraunces",
  "Great Vibes",
  "Heebo",
  "Hind",
  "HindSiliguri",
  "Honk",
  "IBMPlexSans",
  "Inconsolata",
  "IndieFlower",
  "Inter",
  "JosefinSans",
  "Jua",
  "Kalam",
  "Kalnia Glaze",
  "Kanit",
  "Karla",
  "Lato",
  "LibreBaskerville",
  "LibreFranklin",
  "Lilita One",
  "Lobster",
  "Lora",
  "Madimi One",
  "Manrope",
  "MavenPro",
  "Merienda",
  "Merriweather",
  "MerriweatherSans",
  "Montserrat",
  "Mukta",
  "Mulish",
  "NanumGothic",
  "NotoSans",
  "NotoSansJP",
  "NotoSansKR",
  "NotoSansSC",
  "NotoSansTC",
  "NotoSerif",
  "Nunito",
  "NunitoSans",
  "Oleo Script",
  "Open Sans",
  "Oswald",
  "Overpass",
  "Oxygen",
  "Pacifico",
  "Pangolin",
  "Parisienne",
  "Permanent Marker",
  "Play",
  "Playfair Display",
  "PoiretOne",
  "Poppins",
  "Potta One",
  "Prompt",
  "PTSans",
  "PTSansCaption",
  "PTSansNarrow",
  "PTSerif",
  "Questrial",
  "Quicksand",
  "Rajdhani",
  "Rakkas",
  "Raleway",
  "Rampart One",
  "Righteous",
  "Roboto",
  "RobotoCondensed",
  "Roboto Mono",
  "RobotoSlab",
  "Rokkitt",
  "Rubik",
  "ShadowsIntoLight",
  "Signika",
  "Skranji",
  "Slabo27px",
  "SourceCodePro",
  "Teko",
  "TitilliumWeb",
  "Ubuntu",
  "UbuntuCondensed",
  "Varela Round",
  "Vollkorn",
  "WorkSans",
  "Yatra One",
  "YanoneKaffeesatz",
  "Yusei Magic",
] as const;

// Create a valid Zod enum from the font names
export const FontFamily = z.enum(FONT_NAMES);
export type FontFamily = z.infer<typeof FontFamily>;

// Simplified context just for compatibility with existing code
const FontContext = createContext<Record<string, boolean>>({});
export const useIsFontLoaded = (font: string) =>
  useContext(FontContext)[font] || true;

// Simplified component that just renders children
export const LoadFonts = ({ children }: { children: React.ReactNode }) => {
  // All fonts are already loaded on import
  return <FontContext.Provider value={{}}>{children}</FontContext.Provider>;
};
