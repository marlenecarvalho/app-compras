import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { Plus } from 'lucide-react-native';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import { Api } from './src/api';
import type { Category, Item } from './src/types';
import QuantityPicker from './components/QuantityPicker';
import CategoryPicker from './components/CategoryPicker';
import ItemRow from './components/ItemRow';

function Home() {
  const t = useTheme();
  const [nome, setNome] = useState('');
  const [qtd, setQtd] = useState(1);
  const [unit, setUnit] = useState<'Un.'|'L'|'Kg'>('Un.');
  const [cat, setCat] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    Api.listCategories().then(setCategories).catch(console.warn);
    Api.listItems().then(setItems).catch(console.warn);
  }, []);

  const byId = useMemo(() => Object.fromEntries(categories.map(c=>[c.id,c])), [categories]);
  const disabled = !nome.trim() || !cat || qtd < 1;

  async function add() {
    if (disabled) return;
    const novo = await Api.createItem({ nome: nome.trim(), quantidade: qtd, unidade: unit, categoria: cat });
    setItems(s=>[novo, ...s]); setNome(''); setQtd(1); setUnit('Un.'); setCat('');
  }

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: t.colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <ImageBackground
          source={require('./assets/imagem.png')}
          resizeMode="cover"
          imageStyle={{ opacity:0.18 }}
          style={{ paddingTop: 24, paddingBottom: 20 }}
        >
          <View style={[styles.pad]}> 
            <Text style={{ color: t.colors.text, fontSize: 24, fontWeight: '900' }}>Lista de Compras</Text>
          </View>
        </ImageBackground>

        {/* Label Item */}
        <View style={[styles.pad, { marginTop: 6, marginBottom: 6 }]}>
          <Text style={[styles.label, { color: t.colors.textMuted }]}>Item</Text>
        </View>

        {/* Linha 1: Campo Item */}
        <View style={[styles.pad, styles.row]}>
          <TextInput
            placeholder="Digite o item"
            placeholderTextColor={t.colors.textMuted}
            value={nome}
            onChangeText={setNome}
            style={[styles.input, { flex:1, height:44, color:t.colors.text, borderColor:t.colors.violet, backgroundColor:t.colors.overlay }]}
          />
        </View>

        {/* Labels Quantidade/Categoria */}
        <View style={[styles.pad, styles.labels]}> 
          <Text style={[styles.label, { color: t.colors.textMuted }]}>Quantidade</Text>
          <Text style={[styles.label, { color: t.colors.textMuted, marginLeft: 8 }]}>Categoria</Text>
          <Text style={{ opacity: 0 }}>+</Text>
        </View>

        {/* Linha 2: Quantidade + Categoria + Botão */}
        <View style={[styles.pad, styles.row]}>
          <QuantityPicker value={qtd} unit={unit} onChange={(v,u)=>{ setQtd(v); setUnit(u as any); }} />
          <View style={{ flex:1 }}>
            <CategoryPicker categories={categories} selected={cat} onSelect={setCat} />
          </View>
          <Pressable onPress={add} disabled={disabled}
            style={{ height:44, width:44, borderRadius:999, backgroundColor:t.colors.violet, alignItems:'center', justifyContent:'center', opacity: disabled?0.5:1 }}>
            <Plus size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Lista */}
        <View style={[styles.pad, { marginTop: 8 }]}>
          {items.map(it => (
            <ItemRow
              key={it.id}
              item={it}
              category={byId[it.categoria as string]}
              onToggle={(id,v)=>Api.toggle(id,v).then(()=>setItems(s=>s.map(i=>i.id===id?{...i, comprado:v}:i)))}
              onDelete={(id)=>Api.remove(id).then(()=>setItems(s=>s.filter(i=>i.id!==id)))}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: 20 },
  labels: { flexDirection:'row', alignItems:'flex-end', columnGap:12, marginBottom:6 },
  label: { fontSize:12 },
  row: { flexDirection:'row', alignItems:'center', columnGap:12, marginBottom:8 },
  input: { borderWidth:1, borderRadius:12, paddingHorizontal:12 },
});

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
